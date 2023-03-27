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
          excludeByClassNamesOnlyParents = []
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

        let tmpOnlyParents = [];
        excludeByClassNamesOnlyParents.forEach((elem) => {
          let classes = document.querySelector('.' + elem);
          tmpOnlyParents.push(e.target == classes)
        })

        let closeByClassNamesParentOnly = !tmpOnlyParents.some((t) => t == true);

        if (closeByRef && closeByClassNames && closeByClassNamesWithChild && closeByClassNamesParentOnly) {
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