'use client';
import { useEffect, useState } from 'react';

export default function MapContainer() {

  const [correspondence, setCorrespondence] = useState(false)
  const [publications, setPublications] = useState(false)
  const [stays, setStays] = useState(false)

  const lifeData = [{ "Start Year": 1469, "Place": "Rotterdam", "x": 11225.81273, "y": 6623.848529, "Description": "Born 28 October; childhood in the city as the illegitimate son of a priest." }, { "Start Year": 1475, "Place": "Deventer", "x": 11261.47241, "y": 6648.8409, "Description": "Attended a progressive school with strong humanist teachers." }, { "Start Year": 1483, "Place": "’s-Hertogenbosch", "x": 11215.48519, "y": 6662.37073, "Description": "After being orphaned, sent by guardians to a Brethren of the Common Life school." }, { "Start Year": 1487, "Place": "Steyn", "x": 11144.80409, "y": 6716.617996, "Description": "Entered the Augustinian monastery of the Canons Regular." }, { "Start Year": 1492, "Place": "Steyn", "x": 11144.80409, "y": 6716.617996, "Description": "Ordained as a priest while living at the monastery." }, { "Start Year": 1495, "Place": "Paris (Collège de Montaigu)", "x": 10586.93037, "y": 6883.108138, "Description": "Sent by Bishop Hendrik of Bergen to study theology." }, { "Start Year": 1496, "Place": "Paris / France", "x": 10586.93037, "y": 6883.108138, "Description": "Supported himself by tutoring wealthy students after losing financial support." }, { "Start Year": 1499, "Place": "England", "x": 10743.35992, "y": 6435.520408, "Description": "Travelled with William Blount (Lord Mountjoy); met major English humanists including Colet and More." }, { "Start Year": 1500, "Place": "France", "x": 10542.00188, "y": 6925.514842, "Description": "Returned after England; continued scholarly and educational writing." }, { "Start Year": 1506, "Place": "Turin", "x": 10766.75063, "y": 7328.578819, "Description": "Travelled in Italy; obtained doctorate in theology at the University of Turin." }, { "Start Year": 1517, "Place": "Leuven", "x": 10861.12058, "y": 6785.273582, "Description": "Settled after years of travel; already a famous scholar." }, { "Start Year": 1521, "Place": "Basel", "x": 11028.54557, "y": 7096.501798, "Description": "Moved partly to escape hostility from theologians at Leuven." }, { "Start Year": 1529, "Place": "Freiburg im Breisgau", "x": 11033.12712, "y": 7040.325669, "Description": "Left Basel after the city became Protestant." }, { "Start Year": 1535, "Place": "Basel", "x": 11028.54557, "y": 7096.501798, "Description": "Returned for the final period of his life." }, { "Start Year": 1536, "Place": "Basel", "x": 11028.54557, "y": 7096.501798, "Description": "Died in the city." }];

  useEffect(() => {
    initSeadragon();
  }, [])

  const initSeadragon = async () => {
    const OpenSeadragon = await import("openseadragon").then((module) => {
      return module.default;
    });
    const viewer = OpenSeadragon({
        id: "openseadragon",
        prefixUrl: "/osd/osd-assets/",
        tileSources: "/osd/dir.dzi",
    });

    console.log(viewer)

    const x = 9531.84;
    const y = 6534.92;
    const width = 2731.92;
    const height = 898;

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
      console.log(lifeData)
      const imagePoint = new OpenSeadragon.Point(lifeData[0].x, lifeData[0].y);
      const viewportPoint = viewer.viewport.imageToViewportCoordinates(imagePoint);
      console.log(viewportPoint)

      loadPoint(OpenSeadragon, viewer, viewportPoint.x, viewportPoint.y);
    });
  }

  const loadPoint = (OpenSeadragon, viewer, x, y) => {

    const marker = document.createElement("div");
    marker.style.width = "50px";
    marker.style.height = "56px";
    marker.style.backgroundImage = "url(/assets/erasmus-icon.png)";
    marker.style.backgroundSize = "contain";
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
    <div className="w-full h-full flex-1 flex flex-col bg-no-repeat bg-contain bg-cover bg-[url('/assets/bg-parchment.jpg')] rounded-xl shadow-xl p-4">
      <div id="openseadragon" className="w-full h-[85vh] rounded-xl" />
    </div>
  )
}
