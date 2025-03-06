// utils/RandomColors.js
export default function RandomColors() {
  const colors = [
    "bg-meta-11",
    "bg-meta-13",
    "bg-meta-14",
    "bg-meta-15",
    "bg-meta-7",
    "bg-meta-1",
  ];

  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  return randomColor;
}
