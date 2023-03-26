/*   
    Tips how to use:
          - if you have LIST of elements of the same type and classes, use ref
          - if you have some global element outside the element use className or ClassNameWithChilds
          - yes, classNames must be unique as id ex: otherwise, only the first one will have this func
                [toggle_menu_1, toggle_menu_2, toggle_menu_3]
                
    v-click-outside="{
            handler: () => emit('closeSideBar', false),
            excludeRefs: [],
            excludeClassNames: ['navbar__bottom__toggle'],
            excludeByClassNameWithChilds: [],
    }"
*/

export default defineNuxtPlugin((nuxtApp) =>
  nuxtApp.vueApp.directive("click-outside", {
    mounted(el, binding, vnode) {
      el.clickOutsideEvent = function (e) {
        var closeByRef = true;
        var closeByClassNames = true;
        var closeByClassNamesWithChild = true;

        const {
          handler,
          excludeRefs = [],
          excludeClassNames = [],
          excludeByClassNameWithChilds = [],
        } = binding.value;

        excludeRefs.forEach((ref) => {
          if (e.composedPath().includes(vnode.ctx.refs[ref])) {
            closeByRef = false;
          }
        });

        const tmpClassNames = [];
        excludeClassNames.forEach((element) => {
          let classes = document.querySelector("." + element);
          tmpClassNames.push(e.composedPath().includes(classes));
        });
        closeByClassNames = !tmpClassNames.some((t) => t == true);

        let tmpClassWithChilds = [];
        excludeByClassNameWithChilds.forEach((elem) => {
          let classes = document.querySelector("." + elem);
          tmpClassWithChilds.push(e.composedPath().includes(classes));
        });
        closeByClassNamesWithChild = !tmpClassWithChilds.some((t) => t == true);

        if (closeByRef && closeByClassNames && closeByClassNamesWithChild) {
          handler();
        }
      };

      window.document.addEventListener("click", el.clickOutsideEvent);
    },

    unmounted(el, binding) {
      window.document.removeEventListener("click", el.clickOutsideEvent);
    },
  })
);

// export default defineNuxtPlugin((nuxtApp) =>
//   nuxtApp.vueApp.directive("click-outside", {
//     mounted(el, binding, vnode) {
//       el.clickOutsideEvent = function (e) {
//         /*
//         Tip how to use:
//               - if you have LIST of elements of the same type and classes, use ref

//               - if you have some global element outside the element use className or ClassNameWithChilds

//               - yes, classNames must be unique as id ex: otherwise, only the first one will have this func
//                     toggle_menu_1
//                     toggle_menu_2
//                     toggle_menu_3

//         v-click-outside="{
//                 handler: () => emit('closeSideBar', false),
//                 excludeRefs: [],
//                 excludeClassNames: ['navbar__bottom__toggle'],
//                 excludeByClassNameWithChilds: [],
//                 excludeElementItself: true,
//         }"

//         */
//         var close = false;

//         const {
//           excludeRefs = [],
//           handler,
//           excludeClassNames = [],
//           excludeByClassNameWithChilds = [],
//           excludeElementItself = true,
//         } = binding.value;

//         excludeRefs.forEach((refName) => {
//           if (!e.composedPath().includes(vnode.ctx.refs[refName])) {
//             close = true;
//           }
//         });

//         if (
//           !excludeClassNames?.includes(e.target.className) &&
//           excludeClassNames.length
//         ) {
//           close = true;
//         }

//         excludeByClassNameWithChilds.forEach((elem) => {
//           let classes = document.querySelector("." + elem);
//           if (e.composedPath().includes(classes)) {
//             close = false;
//           }
//         });

//         // if (excludeElementItself) {
//         //   console.log("jere");
//         //   if (e.target == el) {
//         //     close = false;
//         //   }
//         // }
//         if (close) {
//           return handler();
//         }
//       };

//       window.document.addEventListener("click", el.clickOutsideEvent);
//     },

//     unmounted(el, binding) {
//       window.document.removeEventListener("click", el.clickOutsideEvent);
//     },
//   })
// );

// /*
// export default defineNuxtPlugin((nuxtApp) =>
//   nuxtApp.vueApp.directive("click-outside", {
//     mounted(el, binding, vnode) {
//       el.clickOutsideEvent = function (e) {
//         var close = false;
//         const {
//           excludeRefs,
//           handler,
//           excludeClassNames = [],
//           excludeByClassNameWithChilds = [],
//         } = binding.value;

//         excludeRefs.forEach((refName) => {
//           if (!e.composedPath().includes(vnode.ctx.refs[refName])) {
//             return handler();
//           }
//         });

//         if (
//           !excludeClassNames?.includes(e.target.className) &&
//           excludeClassNames.length
//         ) {
//           return handler();
//         }

//         var arr = [];
//         excludeByClassNameWithChilds.forEach((className) => {
//           document
//             .querySelector("." + className)
//             .childNodes.forEach((element) => {
//               arr.push(element.className);
//             });
//         });
//         // JSON.stringify(arr)
//         if (!arr.includes(e.target.className)) {
//           return handler();
//         }

//         console.log(arr, e.target.className);
//         // if (classesWithChilds) {
//         //   return handler();
//         // }
//         // console.log(document.querySelector("." + excludeClassNames[1]));
//       };

//       window.document.addEventListener("click", el.clickOutsideEvent);
//     },

//     unmounted(el, binding) {
//       window.document.removeEventListener("click", el.clickOutsideEvent);
//     },
//   })
// );

// */
