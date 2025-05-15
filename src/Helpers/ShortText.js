export default function shortText(text, length) {
  return text.length > length ? text.slice(1, length) + "..." : text;
}
