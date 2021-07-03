import { render, screen } from "@testing-library/react";
import ChatBadge from "./ChatBadge";
import { BadgesContext } from "./ChatList";
import styles from "./ChatBadge.module.css";

const _id = "abcd";
const version = "1234";
const b = {
  click_action: "click_action",
  click_url: "click_url",
  description: "description",
  image_url_1x: "image_url_1x",
  image_url_2x: "image_url_2x",
  image_url_4x: "image_url_4x",
  title: "title",
};
const badges = {
  [_id]: {
    versions: {
      [version]: b,
    },
  },
};
const badge = { _id, version };

test("renders chat emoticon", () => {
  render(
    <BadgesContext.Provider value={badges}>
      <ChatBadge badge={badge} />
    </BadgesContext.Provider>
  );
  expect(screen.getByRole("img")).toBeInTheDocument();
});

test("has altenative text", () => {
  render(
    <BadgesContext.Provider value={badges}>
      <ChatBadge badge={badge} />
    </BadgesContext.Provider>
  );
  expect(screen.getByRole("img")).toHaveAccessibleName(b.title);
});

test("has src and srcset", () => {
  render(
    <BadgesContext.Provider value={badges}>
      <ChatBadge badge={badge} />
    </BadgesContext.Provider>
  );
  const img = screen.getByRole("img") as HTMLImageElement;
  expect(img).toHaveAttribute("src", b.image_url_1x);
  expect(img).toHaveAttribute(
    "srcset",
    `${b.image_url_1x} 1x, ${b.image_url_2x} 2x, ${b.image_url_4x} 4x`
  );
});

test("has align-middle and my-n1 class", () => {
  render(
    <BadgesContext.Provider value={badges}>
      <ChatBadge badge={badge} />
    </BadgesContext.Provider>
  );
  const img = screen.getByRole("img");
  expect(img).toHaveClass("align-middle");
  expect(img).toHaveClass(styles.badge);
});

test("not throws if badges context is not ready", () => {
  render(
    <BadgesContext.Provider value={undefined}>
      <ChatBadge badge={badge} />
    </BadgesContext.Provider>
  );
});

test("not throws if badge doesn't exist", () => {
  render(
    <BadgesContext.Provider value={badges}>
      <ChatBadge badge={{ _id: "efgh", version }} />
    </BadgesContext.Provider>
  );
});
