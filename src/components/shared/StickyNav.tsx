"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Draggable, { type DraggableData, type DraggableEvent } from "react-draggable";
import { cn } from "@/utils/cn";

export type StickyNavItem = { label: string; href: string };

export const stickyNavData: Record<string, StickyNavItem[]> = {
  "/": [
    { label: "Our Story", href: "#our-story" },
    { label: "Destinations", href: "#destinations" },
    { label: "Latest Travel Tips", href: "#latest-travel-tips" },
    { label: "Types of Travel", href: "#types-of-travel" },
    { label: "Meet Expert", href: "#meet-expert" },
    { label: "Reviews", href: "#reviews" },
  ],
};

const visibleCounts: { minWidth: number; count: number | "fill" }[] = [
  { minWidth: 1280, count: 6 },
  { minWidth: 1024, count: 4.5 },
  { minWidth: 0, count: "fill" },
];

const DRAG_THRESHOLD = 5;

type StickyNavProps = {
  items: StickyNavItem[];
  isVisible: boolean;
};

function getVisibleCount() {
  return visibleCounts.find((bp) => window.innerWidth >= bp.minWidth)?.count ?? "fill";
}

export default function StickyNav({ items, isVisible }: StickyNavProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const dragDistance = useRef(0);

  const [x, setX] = useState(0);
  const [minX, setMinX] = useState(0);
  const [isDraggable, setIsDraggable] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const count = getVisibleCount();

    if (count === "fill") {
      viewport.style.width = "";
      const nextMin = Math.min(0, viewport.clientWidth - track.scrollWidth);
      setMinX(nextMin);
      setX((current) => Math.max(nextMin, Math.min(0, current)));
      setIsDraggable(nextMin < 0);
      return;
    }

    const overflow = items.length > count;
    const fullItems = Math.floor(count);
    const fraction = count - fullItems;
    const edgeItem = itemRefs.current[fraction > 0 ? fullItems : fullItems - 1];

    if (overflow && edgeItem) {
      const trackLeft = track.getBoundingClientRect().left;
      const rect = edgeItem.getBoundingClientRect();
      const edge = fraction > 0 ? rect.left + rect.width * fraction : rect.right;
      const width = Math.ceil(edge - trackLeft);
      viewport.style.width = `${width}px`;
      const nextMin = Math.min(0, width - track.scrollWidth);
      setMinX(nextMin);
      setX((current) => Math.max(nextMin, Math.min(0, current)));
    } else {
      viewport.style.width = "";
      setMinX(0);
      setX(0);
    }
    setIsDraggable(overflow);
  }, [items.length]);

  useEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [measure]);

  const handleStart = () => {
    dragDistance.current = 0;
  };

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    dragDistance.current += Math.abs(data.deltaX);
    if (dragDistance.current > DRAG_THRESHOLD) setIsDragging(true);
    setX(data.x);
  };

  const handleStop = () => {
    requestAnimationFrame(() => setIsDragging(false));
  };

  const handleClickCapture = (e: React.MouseEvent) => {
    if (dragDistance.current > DRAG_THRESHOLD) {
      e.preventDefault();
      e.stopPropagation();
      dragDistance.current = 0;
    }
  };

  const handleFocus = (index: number) => {
    const viewport = viewportRef.current;
    const link = itemRefs.current[index];
    if (!isDraggable || !viewport || !link) return;
    const left = link.offsetLeft + x;
    const right = left + link.offsetWidth;
    if (left < 0) setX(Math.min(0, -link.offsetLeft));
    else if (right > viewport.offsetWidth)
      setX(Math.max(minX, viewport.offsetWidth - (link.offsetLeft + link.offsetWidth)));
  };

  if (items.length === 0) return null;

  return (
    <div
      className={cn("sticky-nav", isVisible && "sticky-nav--visible")}
      aria-hidden={!isVisible}
      inert={!isVisible}
    >
      <nav aria-label="Page sections" className="sticky-nav-bar">
        <div ref={viewportRef} className="sticky-nav-viewport">
          <Draggable
            nodeRef={trackRef}
            axis="x"
            bounds={{ left: minX, right: 0 }}
            position={{ x, y: 0 }}
            disabled={!isDraggable}
            onStart={handleStart}
            onDrag={handleDrag}
            onStop={handleStop}
          >
            <div
              ref={trackRef}
              className={cn(
                "sticky-nav-track",
                isDraggable && "sticky-nav-track--draggable",
                isDragging && "sticky-nav-track--dragging",
              )}
              onClickCapture={handleClickCapture}
            >
              {items.map((item, i) => (
                <Fragment key={item.href}>
                  {i > 0 && (
                    <span className="sticky-nav-divider" aria-hidden="true">
                      <Image src="/images/icons/divider-white.svg" width={1} height={16} alt="" />
                    </span>
                  )}
                  <Link
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    href={item.href}
                    role="link"
                    target="_self"
                    aria-label={item.label}
                    draggable={false}
                    className="sticky-nav-link"
                    onFocus={() => handleFocus(i)}
                  >
                    {item.label}
                  </Link>
                </Fragment>
              ))}
            </div>
          </Draggable>
        </div>
      </nav>
    </div>
  );
}
