"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

export default function SemanticMap() {
  const ref = useRef(null);
  const [pts, setPts] = useState([]);
  const [tooltip, setTooltip] = useState(false)

  useEffect(() => {
    fetch("/jsons/points.json").then(r => r.json()).then(setPts);
  }, []);

  useEffect(() => {
    if (!pts.length) return;

    const canvas = ref.current;
    const ctx = canvas.getContext("2d");

    const width = canvas.width = canvas.clientWidth;
    const height = canvas.height = canvas.clientHeight;

    const x = d3.scaleLinear()
      .domain(d3.extent(pts, d => d.x))
      .range([0, width]);

    const y = d3.scaleLinear()
      .domain(d3.extent(pts, d => d.y))
      .range([height, 0]);

    const tooltip = d3.select("body").append("div")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("background", "white")
      .style("padding", "4px 6px")
      .style("font-size", "12px")
      .style("border", "1px solid #ccc")
      .style("border-radius", "4px")
      .style("opacity", 0);

    function drawPoints(transform = d3.zoomIdentity) {
      ctx.save();
      ctx.clearRect(0, 0, width, height);
      ctx.translate(transform.x, transform.y);
      ctx.scale(transform.k, transform.k);

      ctx.fillStyle = "rgba(0, 0, 150, 0.7)";
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(x(p.x), y(p.y), 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    let currentTransform = d3.zoomIdentity;

    const zoom = d3.zoom()
      .scaleExtent([0.5, 50])
      .on("zoom", (event) => {
        currentTransform = event.transform;
        drawPoints(currentTransform);
        tooltip.style("opacity", 0);
      });

    d3.select(canvas).call(zoom);

    drawPoints();

    canvas.addEventListener("mousemove", (e) => {
      const rect = canvas.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;

      const zx = currentTransform;

      // reverse the zoom transform
      const xInv = (mx - zx.x) / zx.k;
      const yInv = (my - zx.y) / zx.k;

      let closest = null;
      let minDist = 8;

      for (const p of pts) {
        const px = x(p.x);
        const py = y(p.y);
        const dx = px - xInv;
        const dy = py - yInv;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < minDist) {
          minDist = dist;
          closest = p;
        }
      }

      if (closest) {
        setTooltip(closest.themes?.join(", "))
        // tooltip
        //   .style("opacity", 1)
        //   .html(closest.themes?.join(", ") ?? "")
        //   .style("left", e.pageX + 10 + "px")
        //   .style("top", e.pageY + 10 + "px");
      } else {
        setTooltip(false)
        // tooltip.style("opacity", 0);
      }
    });

    canvas.addEventListener("mouseleave", () => {
      tooltip.style("opacity", 0);
    });

  }, [pts]);

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-span-3">
        <canvas
          ref={ref}
          className="w-full h-[70vh] p-4 border border-black rounded-md shadow-md"
          style={{ display: "block" }}
        />
      </div>
      <div className="cardo-regular ">
        <p>Mouse over the map to see themes mapped in certain areas.</p>
        <div className="mt-4">
          {tooltip}
        </div>
      </div>
    </div>
  );
}
