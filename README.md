# Sky App Store

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Project Dependencies

- [Node.js](https://nodejs.org/en/) (version>=14.0.0 <17)
- [Yarn](https://yarnpkg.com/lang/en/) (version>=1.19.0)

## Naming Conventions

### Actions are namespaced without duplicate naming

```
export const namespace = 'detail';

// CORRECT
export const FETCH_HERO = `${namespace}/FETCH_HERO`;


// WRONG -- because the module is already named detail
export const FETCH_DETAIL_HERO = `${namespace}/FETCH_DETAIL_HERO`;

```

### Selectors don't need the word selector in their name and without their namespace

```
// CORRECT
export const detail = state => state.detail;

// WRONG
export const detailSelector = state => state.detail;
```

### Avoid using TV/Show/Movie in actions, selectors and reducers names

## Versioning

We use [semver](https://semver.org). So `{breaking change}.{enhancement}.{patch}`

## Actions Best Practices

### Use `createApiAction` to create an API action

```
createApiAction(FETCH_PLAYBACK_META, {
    baseURL: STORE_CONFIG.EXP_API_URL,
    path: `/playback/${mediaAssetId}`,
    meta: { mediaAssetId },
    authenticated: true,
  });
```

### Use follow up actions when needed

For example, if you want to update the selected season after fetching the seasons, then do something
like this:

```
export const fetchSeasons = showUrl => {
  return createApiAction(FETCH_SEASONS, {
    baseURL: STORE_CONFIG.EXP_API_URL,
    path: '/asset/show',
    params: { url: showUrl },
    authenticated: true,
    onSuccess: (dispatch, { payload }) => {
      dispatch(selectSeason(getFirstSeason(payload.seasons)));
    },
  });
};
```

### Follow the naming conventions when writing the action name

## Reducers Best Practices

### Use `createApiModuleReducer` function to make API action reducers

### Use module state scope to structure the data

```
// Notice the usage of the videos key to control the scope of this reducer
const reducers = {
  playbackMetaByMediaAssetId: createApiModuleReducer(
    {
      actionType: FETCH_PLAYBACK_META,
      onSuccess: createApiOnSuccessReducer((data, action) => ({
        ...data,
        [action.meta.mediaAssetId]: action.payload.result,
      }),
    }),
    {},
  ),
};

export default combineReducers(reducers);
```

### Reducers should only manipulate the state they need, nothing else

This following reducer is getting the seasons part of the detail page/screen:

```
// CORRECT
[FETCH_SEASONS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    seasons: action.payload.seasons,
}),


// WRONG
[FETCH_SEASONS_SUCCESS]: (state, action) => ({
    ...state,
    isLoading: false,
    detailHero: action.payload, // this is not needed
    seasons: action.payload.seasons,
}),

```

## Selectors Best Practices

### First overall selector should not be exported and use rootState for overall state name

```
// CORRECT
const detail = rootState => rootState.detail;
export const hero = createSelector(detail, state => state.hero);
export const seasons = createSelector(detail, state => {....});


// WRONG
export const detailState = state => state.detail;
export const hero = createSelector(detailState, stateParam => stateParam.hero);
export const seasons = createSelector(detailState, stateParam => {....});
```

### Exported selectors must use `createSelector` function from `reselect`

See example above.

### Using more specific selectors is better to too many updates

## Modules Best Practices

### Rules for creating modules

Modules need to satisfy at least one of the following:

- It represents a screen/page in the app (e.g: `home`, `detail`)
- It has shareable code (e.g.: `auth`, `spotify`)

`shareable` code has two steps:

- If the data/code is sharing across multiple parts(screens/pages) of the app
- If the code required by both the Web and Native apps

### Unit tests all aspects of the module -- actions, selectors and so on

### Test the module as a whole using Web app and Native app (ask for help if needed)

## Middleware Best Practices

### Rules for adding new middleware

It must be something that affects the entire app and touches all of its actions and state. For
example, API calls, Analytics on each action, Logging? and so on...

## IDE Configuration

We use EditorConfig (`.editorconfig`), Prettier (`.prettierrc.js`) and ESLint (`.eslintrc.js`) to
keep our code style consistent.

Make sure have these plugins installed and enabled.

The plugins will deal with the file encodings, line endings and give warnings to the code style
issues while coding.

### Visual Studio Code

Install from the following links.

- [EditorConfig](vscode:extension/EditorConfig.EditorConfig)
- [Prettier](vscode:extension/esbenp.prettier-vscode)
- [ESLint](vscode:extension/dbaeumer.vscode-eslint)

To automatically fix the code style issues on save, you can add these settings into your workspace
settings file.

`.vscode/settings.json`

```
{
  "eslint.autoFixOnSave": true,
  "eslint.options": { "extensions": [".html", ".js", ".jsx", ".ts", ".tsx"] },
  "eslint.validate": [
    { "language": "javascript", "autoFix": true },
    { "language": "javascriptreact", "autoFix": true },
    { "language": "typescript", "autoFix": true },
    { "language": "typescriptreact", "autoFix": true }
  ]
}
```

### IntelliJ / WebStorm

Install from the following links.

Enable and set the plugins to read the configuration files from the project root.

- [EditorConfig](https://plugins.jetbrains.com/plugin/7294-editorconfig)
- [Prettier](https://plugins.jetbrains.com/plugin/10456-prettier)
- [ESLint](https://plugins.jetbrains.com/plugin/7494-eslint)

## Development Guideline

### Folder Structure

```
sky-web-app/
├─ scripts/         // All the scripts related repository.
└─ src
   ├─ __mocks__/    // Code for mocks for global modules and modules under `src`
   ├─ __tests__/    // Code for tests, can exist in any level.
   ├─ config/       // Redux store config.
   ├─ errors/       // Generic errors.
   ├─ middleware/   // Redux middlewares.
   ├─ modules/      // Store modules.
   ├─ types/        // Domain models and interfaces.
   └─ utils/        // Util modules and functions
```

### Debugging Tools

- [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
  (other plateforms [check here](http://extension.remotedev.io/))

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br /> Open [http://localhost:3001](http://localhost:3001) to
test and debug locally.

The page will reload if you make edits.<br /> You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br /> See the section about
[running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Compiles the project with `tsc` and creates a publishable `lib` folder.

## Learn More

You can learn more in the
[Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Local setup

### Private npm registry access

Create a `$HOME/.npmrc` file with your personal artifactory credentials, if not already present:

    _auth = ${NPM_REGISTRY_AUTH}
    email = ${NPM_REGISTRY_EMAIL}

### Developing alongside a consuming application

NOTE: The below will only work with the `sky-web-app`, but not with `sky-native-app` due to
[React Native not handling symlinks](https://github.com/facebook/metro/issues/1#issuecomment-282799444)
by default.

During development it might be useful to use a local version of this shared library in one of the
consuming applications (e.g. `sky-web-app` or `sky-native-app`). It is possible with
[`yarn link`](https://yarnpkg.com/lang/en/docs/cli/link/). Refer to
[the docs](https://yarnpkg.com/lang/en/docs/cli/link/) for more info, but in short here's what you
need to do:

1. Run `yarn link` in this project's root.
2. Run `yarn link @skytvnz/sky-app-store` in the consuming application project's root.

Besides, in order for Hooks to work, the react import from the application code needs to resolve to
the same module, you need to do:

3. Link `react` and `react-redux` in this project:

   a) Run `cd node_modules/react && yarn link`

   b) Run `cd node_modules/react-redux && yarn link`

4. consume the same modules in your application project:

   a) Run `yarn link react`

   b) Run `yarn link react-redux`

NOTE: Don't forget to [`unlink`](https://yarnpkg.com/en/docs/cli/unlink) when you're done.
