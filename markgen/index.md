---
title: Getting Started
---

# Getting Started with Markgen CLI

Welcome to Markgen CLI, a powerful JavaScript tool designed to convert Markdown files into a static site that can be hosted on any platform. Markgen utilizes the `marked` npm package for seamless Markdown to HTML conversion. Before you begin, ensure you have Node.js version 20 or higher installed on your machine.

## Prerequisites

Before you get started, make sure you have the following prerequisites installed:

- **Node.js:** Markgen CLI requires Node.js version 20 or higher. You can download and install it from [the official Node.js website](https://nodejs.org/).

## Installation

As Markgen is not installable as a package, you can download the latest release from the [Markgen GitHub Releases page](https://github.com/dylanclaywell/markgen/releases). Once downloaded, extract the contents and follow the usage instructions below.

## Usage

To convert Markdown files to a static site using Markgen CLI, follow these steps:

1. Open your terminal.

2. Navigate to the directory where you extracted the Markgen files.

3. Run the following command:

   ```bash
   node markgen.js --input ./path/to/markdown/files --output ./path/to/output
   ```

   - `--input`: Specify the directory containing your Markdown files.
   - `--output`: Specify the directory where you want the static site to be generated.

For more options and advanced usage, check out the [CLI documentation](https://github.com/dylanclaywell/markgen).

## Example

Assuming you have a directory structure like this:

```plaintext
project-root/
|-- markdown-files/
|   |-- file1.md
|   |-- file2.md
|-- output/
```

Navigate to the Markgen directory and run:

```bash
node markgen.js --input ./markdown-files --output ./output
```

This will convert the Markdown files in the `markdown-files` directory and generate the static site in the `output` directory.

## Additional Information

- GitHub Repository: [markgen](https://github.com/dylanclaywell/markgen)
- Releases: [Markgen Releases](https://github.com/dylanclaywell/markgen/releases)
- Issues and Bugs: [GitHub Issues](https://github.com/dylanclaywell/markgen/issues)

Feel free to create issues if you have any questions or need assistance. Happy coding!
