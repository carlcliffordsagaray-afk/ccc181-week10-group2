# CCC181 Week 10: CampusConnect Mobile-First Login Page

React + TypeScript starter for the Week 10 group activity. The page is already
built. Your group's job is the **mobile-first CSS** and the **GitHub teamwork**.

## Run it

```bash
npm install
npm run dev          # open the local URL it prints
npm run dev:phone    # same, but your phone (same Wi-Fi) can open the Network URL
npm run build        # must finish with no errors before you submit
```

## Rules

- Edit only the CSS files in `src/styles/` (one member = one file). Do not edit `reset.css`.
- Plain CSS only. No Tailwind, Bootstrap, Material UI, styled-components, or any UI library.
- Phone styles first (no media query), then `min-width` queries only. Never `max-width`.
- Do not edit the `.tsx` files or rename classes. If you must, tell the group first.

## Group information (fill in)

| Item | Your answer |
| --- | --- |
| Group number |2|
| Section |IT3-A |
| Repository URL | https://github.com/carlcliffordsagaray-afk/ccc181-week10-group2 |

## Members (each member fills in their own row in their own commit)

| Member | Name | GitHub username | CSS file | What I did |
| --- | --- | --- | --- | --- |
| 1 (leader) |Carl Clifford Sagaray |carlcliffordsagaray-afk| `base.css` |Wrote base.css (mobile-first CSS Grid layout, brand panel, container) with breakpoints at 768, 1024 and 1280 px. Added the viewport meta tag and set up the GitHub repository.|
| 2 |Andrei Jumao-as |andreijumao-as-commits | `nav.css` |Wrote nav.css (mobile-first Flexbox navbar and CSS Grid footer, 48px touch-friendly links, hover and focus-visible styles) with breakpoints at 768 and 1024 px. |
| 3 |John Xyrel Vanguardia|johnxyrelvanguardia-cmd | `form.css` |Wrote form.css (mobile-first Flexbox login card, 48px touch-friendly fields and buttons, hover and focus-visible styles) with breakpoints at 768 and 1024 px.|
## Experiment 0: the page without the viewport tag

What did the page look like in DevTools phone mode **before** adding the viewport meta tag?
What changed **after** adding it?

> Before adding the viewport meta tag, the page in DevTools phone mode (iPhone SE) looked zoomed out and tiny. The browser treated the screen as about 980 px wide and shrank the whole page to fit, so the text was very small and the phone layout (stacked nav, single column) did not appear as designed. After adding <meta name="viewport" content="width=device-width, initial-scale=1" /> to index.html and refreshing, the page used the real phone width (about 360 px). The text became readable, the nav links stacked, and the mobile CSS applied correctly.

## DevTools test results

| Width | What must be true | Pass? |
| --- | --- | --- |
| 360 px | 1 column. Nav links stacked and 48px tall. Options and buttons stacked. Footer in 1 column. No sideways scrollbar. | |
| 768 px | Nav in one row (brand left, links right). Checkbox and link in one row. Two buttons side by side. | |
| 1024 px | Brand panel and login card side by side. Footer in 3 columns. Heading is larger. | |
| 1280 px | Content centered and stops at 1200px. | |

### Breakpoints I observed

Using **Show media queries** and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:

> Using Show media queries and dragging slowly from 360 px to 1280 px, the layout changed at these exact widths:

- 768 px: the nav changed to one row (brand left, links right), the checkbox and "Forgot password?" moved side by side, the two bottom buttons moved side by side, and the login card became capped at 32rem and centered.
- 1024 px: the brand panel and login card moved side by side in two columns, the heading grew to 2.5rem, the perks list appeared, and the footer changed to three columns.
- 1280 px: the content stopped stretching and stayed centered at a maximum width of 1200 px.

No width looked broken. There was no sideways scrollbar at any width, including when the error and success messages were showing.

Screenshots are in `screenshots/` as `360.png`, `768.png`, `1024.png`, `1280.png`.

## What our group learned (leader writes this last)

> In this activity we learned how mobile-first design works: we wrote the phone styles first with no media query, then used only min-width media queries at 768, 1024 and 1280 px to add layout as the screen got wider. We practiced CSS Grid for the page layout and footer and Flexbox for the navbar and form, and we used rem and % units so the page scales well. We also learned why the viewport meta tag is needed, since without it phones shrink the page instead of using the real screen width. For touch-friendly design, we made every link, button and input at least 48 px tall, used 16 px input text, and gave every :hover style a matching :focus-visible style. We tested the page in Chrome DevTools at 360, 768, 1024 and 1280 px.

The hardest part for our group was the GitHub workflow. At first we struggled with creating pull requests and merging our CSS files, because we were not used to working on separate branches, having a different teammate review each pull request, and then pulling the merged changes into main. Along the way we learned that each member should work only in their own file and branch, that commits must be made from our own GitHub accounts, and that we should run git pull after every merge so everyone has the latest code. By the end, we were able to open, review and merge our pull requests and combine our three CSS files into one working page.




README-part2-section.md

| Group number | 2 |

| Section | IT3-A |

| Repository URL | https://github.com/carlcliffordsagaray-afk/ccc181-week10-group2 |

## Who did what in Part 2 (each member fills in their own row)

| Member | Name | GitHub username | Area | What I did in Part 2 |
| --- | --- | --- | --- | --- |
| 1 (leader) | Carl Clifford Sagaray | carlcliffordsagaray-afk | Backend: login (`server/index.js`, `routes/sessions.js`, `data/users.js`) | Set up the Express project in server/ (package.json, .env.example, dotenv, CORS limited to the front end address, express.json). Built POST /api/v1/sessions: it validates the body (400), finds the user by lowercase email, compares the password with bcryptjs against a stored hash, returns the same 401 message for a wrong password or an unknown email, and returns 200 with a 1-hour JWT and the user on success. Added the hashed demo account and the GET /api/v1/health endpoint. |
| 2 | Andrei Jumao-as | andreijumao-as-commits | Backend: protection and documents (`middleware/`, `routes/users.js`, `docs/`, Postman) | Built the token middleware that reads Authorization: Bearer and verifies the JWT (401 "Not logged in." if missing, wrong or expired), and GET /api/v1/users/me. Added the 404 and 500 error handlers that never leak stack traces. Wrote docs/API-SPEC.md including the events design, made the Postman collection with all 7 requests, and took the Postman screenshots. |
| 3 |


## What our group learned in Part 2

In Part 2 we learned how a React front end and an Express backend work together as two separate apps running at the same time. We designed the API first as a contract (GET /health, POST /sessions, GET /users/me) and used the correct status codes: 200 for success, 400 for bad input, and 401 for a wrong or unknown login, with the same message so nobody can find out which emails exist. On the backend we stored passwords as bcrypt hashes, signed a token with a secret kept in .env, and protected GET /users/me with a middleware. On the front end we learned that the Welcome screen must appear only after the API answers 200, and that every screen needs Loading, Success and Error states with friendly messages instead of raw errors. We also learned to keep settings in .env files, commit only the .env.example files, and allow only the front end address in CORS. Testing every endpoint in Postman before connecting the page made it easier to find where a bug was.
