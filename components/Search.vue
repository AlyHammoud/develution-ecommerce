<template>
  <div class="search-bar" v-disable-window-scroll>
    <p class="close" @click="$emit('close')">close <span>x</span></p>
    <div class="search-input">
      <input type="text" name="" id="" placeholder="Search here" />
    </div>
    <div class="search-logs">
      <div class="accordian">
        <div
          class="accordian-top"
          @click="showCategoryAccoridan = !showCategoryAccoridan"
        >
          <p class="accordian-top-name">Categories</p>
          <p class="accordian-top-icon">+</p>
        </div>
        <Transition>
          <div class="accordian-bottom" v-if="showCategoryAccoridan">
            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>
          </div>
        </Transition>
      </div>

      <div class="accordian">
        <div
          class="accordian-top"
          @click="showItemAccoridan = !showItemAccoridan"
        >
          <p class="accordian-top-name">Items</p>
          <p class="accordian-top-icon">+</p>
        </div>
        <Transition>
          <div class="accordian-bottom" v-if="showItemAccoridan">
            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>
          </div>
        </Transition>
      </div>

      <div class="accordian">
        <div
          class="accordian-top"
          @click="showProductAccoridan = !showProductAccoridan"
        >
          <p class="accordian-top-name">Product</p>
          <p class="accordian-top-icon">+</p>
        </div>
        <Transition>
          <div class="accordian-bottom" v-if="showProductAccoridan">
            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>

            <nuxt-link to="#">
              <div class="item">
                <img src="/images/empty.png" alt="" />
                <p>Name</p>
              </div>
            </nuxt-link>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>
<script setup>
const showCategoryAccoridan = ref(false);
const showProductAccoridan = ref(false);
const showItemAccoridan = ref(false);
</script>

<style lang="scss">
.search-bar {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 80%;
  position: relative;
  overflow: auto !important;

  .close {
    position: absolute;
    right: 8px;
    top: 8px;
    color: $whiteColor;
    cursor: pointer;

    span {
      border: 1px solid $whiteColor;
      border-radius: 50%;
      width: 8px;
      height: 8px;
      padding: 4px 8px;
    }
  }

  .search-input {
    width: min(600px, 70%);
    height: fit-content;
    margin: 0 auto;
    background-color: white;
    margin-block: 50px;
    border-top-right-radius: 8px;
    border-top-left-radius: 8px;
    box-shadow: 1px 10px 40px $blackColor;
    transition: all 0.3s;

    & > input:focus {
      box-shadow: 1px 10px 40px $secondaryColor;
      transition: all 0.3s;
    }

    input {
      width: 100%;
      height: 35px;
      border-radius: inherit;
      outline: none;
      border: none;
      padding: 5px;
      font-size: 1rem;
      transition: all 0.3s;
    }
  }

  .search-logs {
    display: flex;
    flex-direction: column;
    gap: 30px;
    width: 100%;
    padding: 20px 50px;

    .accordian {
      width: 100%;
      overflow: hidden;

      &-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
        height: 50px;
        background-color: $grayDarkColor;
        padding-inline: 30px;
        box-shadow: inset 1px 1px 8px black;

        &-name {
          font-size: 1.2rem;
        }
        &-icon {
          margin-right: 20px;
          font-size: 1.2rem;
        }
      }

      &-bottom {
        height: 100%;
        background-color: $bg-color;
        box-shadow: inset 1px 1px 8px black;

        .item {
          display: flex;
          align-items: center;
          gap: 100px;
          padding: 10px 30px;
          border-bottom: 1px solid $blackColor;
          transition: all 0.2s ease;
          color: $blackColor;

          &:hover {
            background-color: $grayDarkColor;
            box-shadow: inset 1px 1px 8px black;
          }

          img {
            width: 80px;
            height: 80px;
            object-fit: cover;
            border-radius: 4px;
          }
        }
      }
    }
  }
}
</style>
