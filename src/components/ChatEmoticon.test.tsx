import { render, screen } from "@testing-library/react";
import ChatEmoticon from "./ChatEmoticon";

const emoticonId = "1234";
const name = "test emoticon";

test("renders chat emoticon", () => {
  render(<ChatEmoticon emoticonId={emoticonId} name={name} />);
  expect(screen.getByRole("img")).toBeInTheDocument();
});

test("has altenative text", () => {
  render(<ChatEmoticon emoticonId={emoticonId} name={name} />);
  expect(screen.getByRole("img")).toHaveAccessibleName(name);
});

test("has src and srcset", () => {
  render(<ChatEmoticon emoticonId={emoticonId} name={name} />);
  const img = screen.getByRole("img") as HTMLImageElement;
  expect(img).toHaveAttribute(
    "src",
    "https://static-cdn.jtvnw.net/emoticons/v2/1234/default/light/1.0"
  );
  expect(img).toHaveAttribute(
    "srcset",
    "https://static-cdn.jtvnw.net/emoticons/v2/1234/default/light/1.0 1x, https://static-cdn.jtvnw.net/emoticons/v2/1234/default/light/2.0 2x, https://static-cdn.jtvnw.net/emoticons/v2/1234/default/light/3.0 4x"
  );
});

test("has align-middle and my-n1 class", () => {
  render(<ChatEmoticon emoticonId={emoticonId} name={name} />);
  const img = screen.getByRole("img");
  expect(img).toHaveClass("align-middle");
  expect(img).toHaveClass("my-n1");
});
