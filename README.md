# character-tools

Character tools is a web application created to make it easier for me to create and edit character cards.

# Features

## Character Editor

Edit character cards in a simple and easy to use interface.
- Import .json .png & .webp character cards
- Export .png & .json character cards
- Easy access for common macros
  - Replace character name
- Token count for the most common Tokenizers
- Apply [CharacterBook](#characterbook-editor) to your characters

## Character Library

Save characters in a "on browser" library that use indexedDb, all your information is stored locally, no data is sent to the server.

- Easy visualization of your characters in the library.
- Import single or multiple characters at once.
- Save a copy of your library to use in another browser.

## CharacterBook editor

Also known as LoreBooks or Worldbooks, these are collections of knowledge that can be inserted dynamicly into your prompts.

- Share & Import CharacterBooks with others.
- Easy management of Entries.

## CharacterBook library

- Manage your CharacterBooks
- Import single or multiple CharacterBooks at once.
- Save a copy of your library to use in another browser.

# Usage

## Development

To build the project I used [Bun](https://bun.sh) and [Vite](https://vitejs.dev/). I highly recommend using it.

1. Install the dependencies

```bash
bun install
```

2. Run the development server

```bash
bun run dev
```

3. Make changes to the source code, Vite hot-reloads the page for you.

4. Commit your changes and push them to GitHub.

5. Make a pull request and wait for it to be merged.

6. Be happy!

## Deployment

1. Install the dependencies

```bash
bun install
```

2. Build the project

```bash
bun run build
```

3. Deploy the project, you can use any static hosting service. Just upload all the files in the `dist` folder.

4. Be happy!

# Future Features

Right now I don't have any plans to add new features, but I'm open to suggestions and feedback.

> [!NOTE]
> Originally I was planning to add more features to give better support for Specific Tools, but now I don't think it is necessary to do so.