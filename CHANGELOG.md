## [2.0.0](https://github.com/tutkli/ngx-sonner/compare/v1.0.1...v2.0.0) (2024-06-11)


### ⚠ BREAKING CHANGES

* minimal angular version is now v18

### Features

* update to angular v18 ([2cc9c63](https://github.com/tutkli/ngx-sonner/commit/2cc9c634ac2d07d2d2b815a2a4f9a4c20317f19b))

## [1.0.1](https://github.com/tutkli/ngx-sonner/compare/v1.0.0...v1.0.1) (2024-06-11)


### Bug Fixes

* allow to render custom icons for toasts ([59c1aca](https://github.com/tutkli/ngx-sonner/commit/59c1aca734f399a4a4e0ad60fcccda7666a7b068)), closes [#10](https://github.com/tutkli/ngx-sonner/issues/10)


### Chores

* provide zoneless change detection support ([ca8066b](https://github.com/tutkli/ngx-sonner/commit/ca8066bfb7ec4e5480ac4c4e77d2a49621758ed2))
* remove polyfills from lib schema ([820e23b](https://github.com/tutkli/ngx-sonner/commit/820e23b6642ef8f622eb2abfa912f81f1c655639))
* update node version ([15f87a5](https://github.com/tutkli/ngx-sonner/commit/15f87a55977c0c0f46ed7be58081efe8a13b25e2))
* update nx ([c9774d1](https://github.com/tutkli/ngx-sonner/commit/c9774d1c8fe4b45a8469ab06c533e291f8328ec4))

## [1.0.0](https://github.com/tutkli/ngx-sonner/compare/v0.4.2...v1.0.0) (2024-04-16)


### ⚠ BREAKING CHANGES

* toast dissmisable field has been renamed to dismissible

### Features

* add closeButton property to toast options ([#17](https://github.com/tutkli/ngx-sonner/issues/17)) ([da3fdda](https://github.com/tutkli/ngx-sonner/commit/da3fdda0ab19c4b2bc15443f4f4656237c40f74e))


### Bug Fixes

* check toast dismissible value in toaster ([31bfc7b](https://github.com/tutkli/ngx-sonner/commit/31bfc7b539e4adad490075ad71bfdf782f3d27c9))
* dismissable renamed to dismissible ([8e30c20](https://github.com/tutkli/ngx-sonner/commit/8e30c203036db4ed26523fd33761ebf573fb2e02))
* dismissable renamed to dismissible ([a162a3f](https://github.com/tutkli/ngx-sonner/commit/a162a3f7b09db0df6bec1deb0f7ed879748d6b01))
* don't allow to swipe out a toast if it's not dismissible ([9502c43](https://github.com/tutkli/ngx-sonner/commit/9502c43602db965d2aa0f09b9e62925c7b1e3fc3))
* remove console log ([42a940b](https://github.com/tutkli/ngx-sonner/commit/42a940b522407328cba47f0bb70227797b483a75))

## [0.4.2](https://github.com/tutkli/ngx-sonner/compare/v0.4.1...v0.4.2) (2024-04-16)


### Bug Fixes

* access document only in browser ([#15](https://github.com/tutkli/ngx-sonner/issues/15)) ([308a56a](https://github.com/tutkli/ngx-sonner/commit/308a56a0c5cb383a7f6d61997a25b5549acd2a6c))

## [0.4.1](https://github.com/tutkli/ngx-sonner/compare/v0.4.0...v0.4.1) (2024-04-11)


### Bug Fixes

* hide close button on non dimissable toasts ([#12](https://github.com/tutkli/ngx-sonner/issues/12)) ([3d1b31a](https://github.com/tutkli/ngx-sonner/commit/3d1b31aa7071590f5b88b84fe06c086c9ef5260a))

## [0.4.0](https://github.com/tutkli/ngx-sonner/compare/v0.3.4...v0.4.0) (2024-04-01)


### Features

* use new signal queries ([#4](https://github.com/tutkli/ngx-sonner/issues/4)) ([bde803e](https://github.com/tutkli/ngx-sonner/commit/bde803efb543fbbbc4a812d6ebc19d4c595cd04a))


### Bug Fixes

* blurry toasts ([#6](https://github.com/tutkli/ngx-sonner/issues/6)) ([5ba650c](https://github.com/tutkli/ngx-sonner/commit/5ba650c58ecf1fa1f839c85fe0ebe5e825a72f65))
* preserve heights order when adding new toasts ([#8](https://github.com/tutkli/ngx-sonner/issues/8)) ([c7775a2](https://github.com/tutkli/ngx-sonner/commit/c7775a20f165bc39575afd599004e6cb3787859a))


### Chores

* remove nx cloud ([fe4a4d1](https://github.com/tutkli/ngx-sonner/commit/fe4a4d19c9b9d97f4af096e5bb909f04b0b0a777))
* sync package-lock.json ([ead7f75](https://github.com/tutkli/ngx-sonner/commit/ead7f7597326b1f2ea166fab1fa4efe1821831f8))
* sync package-lock.json ([bcf2f46](https://github.com/tutkli/ngx-sonner/commit/bcf2f468815d1974e621d4fd9e8918a39a8a0334))
* update nx ([ddc83fa](https://github.com/tutkli/ngx-sonner/commit/ddc83fa76da51f9d85dd4c2aa7eeb1cf8c1f029f))

## [0.3.4](https://github.com/tutkli/ngx-sonner/compare/v0.3.3...v0.3.4) (2024-03-07)


### Bug Fixes

* cleanup tests ([b241099](https://github.com/tutkli/ngx-sonner/commit/b241099e5d1c60f928aef361f4ce042feddbb945))
* move toast buttons style condition to toast component ([1ca7986](https://github.com/tutkli/ngx-sonner/commit/1ca79865520dabef8444667ef06f9edb1d919832))
* remove unused app ([e87c93c](https://github.com/tutkli/ngx-sonner/commit/e87c93c23aeab9c3d232878a010f713977ad188b))
* toast button styles ([b2d6118](https://github.com/tutkli/ngx-sonner/commit/b2d6118218572a22e3fa6e93d0ed556f3b7f4c47))

## [0.3.3](https://github.com/tutkli/ngx-sonner/compare/v0.3.2...v0.3.3) (2024-03-06)


### Bug Fixes

* toast styles via toastOptions ([0f593cb](https://github.com/tutkli/ngx-sonner/commit/0f593cb016aa45d2d9e5d04b8cc5e5a5f0e77d7f))

## [0.3.2](https://github.com/tutkli/ngx-sonner/compare/v0.3.1...v0.3.2) (2024-02-26)


### Bug Fixes

* toaster input types ([58de5e0](https://github.com/tutkli/ngx-sonner/commit/58de5e0dc105fa908d0d6c635fef7b22e0ab7e57))

## [0.3.1](https://github.com/tutkli/ngx-sonner/compare/v0.3.0...v0.3.1) (2024-02-26)


### Bug Fixes

* doc snippets ([0d7ab81](https://github.com/tutkli/ngx-sonner/commit/0d7ab813b21cd563566298bb656dabd09463cf22))
* lint errors ([a6f5efd](https://github.com/tutkli/ngx-sonner/commit/a6f5efd8e9cb0a531ee2f6fb93ae4713b6e42fd6))
* toast show correct theme when system is set ([d72dd88](https://github.com/tutkli/ngx-sonner/commit/d72dd88009aa3ac43285378116860eee3dc4287d))


### Chores

* add github templates ([5f88601](https://github.com/tutkli/ngx-sonner/commit/5f88601cd77454b69ed697392cd60a8f5a798168))
