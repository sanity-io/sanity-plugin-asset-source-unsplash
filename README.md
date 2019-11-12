# Sanity Asset Source: Unsplash

## Installation

`sanity install asset-source-unsplash`

Edit the config file found in `./config/sanity-plugin-asset-source-unsplash.json` with your Unsplash API key.

## Developing on this module

To simulate using your development version as a real module inside a studio, you can do the following:

* Run `npm install && npm link` from the root of this repository.
* Run `npm run watch` to start developing and build the module when changes are made.

#### Displaying your development version inside a studio

**With the mono-repo's `test-studio`:**

  * Bootstrap the monorepo: `npm run bootstrap`
  * Add `sanity-plugin-asset-source-unsplash` with the current version number to `package.json` in the `test-studio` root folder (but don't run `npm install` afterwards)
  * Run `npm link sanity-plugin-asset-source-unsplash` inside the mono-repo's root.
  * Add `asset-source-unsplash` to the list of the studios plugins in `sanity.json`.
  * Restart the `test-studio`

**With a regular Sanity Studio:**
  * Run `npm install`
  * Add `sanity-plugin-asset-source-unsplash` with the current version number to `package.json`.
  * Run `npm link sanity-plugin-asset-source-unsplash`
  * Add `asset-source-unsplash` to the list of the studios plugins in `sanity.json`.
  * Start the studio

When you are done and have published your new version, you can run `npm unlink` inside this repo, and `npm unlink sanity-plugin-asset-source-unsplash` inside the mono-repo or studio to get back to the normal state. Then run `npm run bootstrap` for the mono-repo or `npm install` inside the regular studio to use the published version.


## Futher reading

https://github.com/danielma/unsplash-react

