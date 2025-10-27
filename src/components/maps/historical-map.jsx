'use client';
import { useEffect, useState } from 'react';

import Map from '@/components/map/map';

export default function MapContainer() {

  const [correspondence, setCorrespondence] = useState(false)
  const [publications, setPublications] = useState(false)
  const [stays, setStays] = useState(false)

  useEffect(() => {
    (async() => {
      const OpenSeadragon = await import("openseadragon").then((module) => {
        return module.default;
      });
      console.log(OpenSeadragon)
      const viewer = OpenSeadragon({
          id: "openseadragon",
          prefixUrl: "/assets/openseadragon/images/",
          tileSources: "/historical-map/dir.dzi",
      });

      const x = 8531.84;
      const y = 6034.92;
      const width = 4531.92;
      const height = 1728;

      viewer.addHandler("open", () => {
        // Assuming you are interested in the first image in the viewer (or you only have one image)
        var tiledImage = viewer.world.getItemAt(0); 
        
        var imageRect = new OpenSeadragon.Rect(x, y, width, height); // Or whatever area you want to focus on
        
        var viewportRect = tiledImage.imageToViewportRectangle(imageRect);
        viewer.viewport.fitBounds(viewportRect, true);

        viewer.addHandler("canvas-click", (event) => {
          // event.position = pixel coordinates relative to viewer container
          const viewportPoint = viewer.viewport.pointFromPixel(event.position);
          const tiledImage = viewer.world.getItemAt(0);
          const imagePoint = tiledImage.viewportToImageCoordinates(viewportPoint);

          console.log("Viewport coordinates:", viewportPoint); // OpenSeadragon viewport coords
          console.log("Image coordinates:", imagePoint);        // DeepZoom image pixels
        });

        const samplePointX = 0.3692334;
        const samplePointY = 0.2224970;

        loadPoint(OpenSeadragon, viewer, samplePointX, samplePointY);
      });

    })()
  }, [])

  const loadPoint = (OpenSeadragon, viewer, x, y) => {

    const marker = document.createElement("div");
    marker.style.width = "20px";
    marker.style.height = "20px";
    marker.style.background = "red";
    marker.style.borderRadius = "50%";

    const popup = document.createElement("div");
    popup.style.position = "absolute";
    popup.style.background = "white";
    popup.style.border = "1px solid black";
    popup.style.padding = "4px 6px";
    popup.style.display = "none"; // hidden by default
    popup.innerText = "This is Erasmus's birthplace";

    document.body.appendChild(popup);

    marker.addEventListener("mouseenter", () => {
      popup.style.display = "block";
    });
    marker.addEventListener("mouseleave", () => {
      popup.style.display = "none";
    });

    viewer.addOverlay({
      element: marker,
      location: new OpenSeadragon.Point(x, y),
      placement: "CENTER"
    });

    viewer.addHandler("animation", () => {
      const position = viewer.viewport.pixelFromPoint(
        viewer.viewport.imageToViewportCoordinates(new OpenSeadragon.Point(x, y))
      );
      popup.style.left = `${position.x + 10}px`;
      popup.style.top = `${position.y + 10}px`;
    });
  }

  return (
    <div className="w-full h-full flex-1 flex flex-col">
      <div id="openseadragon" className="w-full h-[85vh]" />
    </div>
  )
}
