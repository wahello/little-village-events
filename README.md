To start storybook, in terminal run `yarn storybook` wait until it says *Running Metro Bundler on port 8081.* then in a different terminal run `yarn run:ios`.

Running `yarn run:ios` is needed only when native code changes, otherwise `yarn storybook` should be enough, but emulator will not be started automatically.  
