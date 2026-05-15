import { test, expect } from "playwright/test";

test.describe("Testing of API", () => {
  test("ID=1, Title=VerifyGetRequest", async ({ request }) => {
    const response = await request.get(
      "https://jsonplaceholder.typicode.com/posts",
    );
    expect(response.ok()).toBeTruthy();
    const posts = await response.json();
    expect(posts.length).toBeGreaterThan(2);
  });
});
