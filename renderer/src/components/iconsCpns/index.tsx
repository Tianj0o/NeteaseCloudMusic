import { defineComponent } from "vue";

export const iconBlank = defineComponent({
  render() {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="black"
          d="M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
        ></path>
      </svg>
    );
  },
});

export const iconChecked = defineComponent({
  render() {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="black"
          d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2zm-9 14l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
        ></path>
      </svg>
    );
  },
});

export const iconReset = defineComponent({
  render() {
    return (
      <svg width="1em" height="1em" viewBox="0 0 21 21">
        <g
          fill="black"
          fill-rule="evenodd"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          transform="matrix(0 1 1 0 2.5 2.5)"
        >
          <path d="M3.987 1.078A8 8 0 1 0 8 0"></path>
          <circle cx="8" cy="8" r="2" fill="currentColor"></circle>
          <path d="M4 5V1H0"></path>
        </g>
      </svg>
    );
  },
});

export const iconSave = defineComponent({
  render() {
    return (
      <svg width="1em" height="1em" viewBox="0 0 32 32">
        <path
          fill="black"
          d="m27.71 9.29l-5-5A1 1 0 0 0 22 4H6a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h20a2 2 0 0 0 2-2V10a1 1 0 0 0-.29-.71ZM12 6h8v4h-8Zm8 20h-8v-8h8Zm2 0v-8a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v8H6V6h4v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6.41l4 4V26Z"
        ></path>
      </svg>
    );
  },
});

export const iconJump = defineComponent({
  render() {
    return (
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="black"
          d="M9.25 2a.75.75 0 0 1 .75.75v2.5a.75.75 0 0 1-1.5 0v-2.5A.75.75 0 0 1 9.25 2ZM4.47 3.97a.75.75 0 0 1 1.06 0l1.75 1.75a.75.75 0 1 1-1.06 1.06L4.47 5.03a.75.75 0 0 1 0-1.06Zm9.56 0a.75.75 0 0 1 0 1.06l-1.75 1.75a.75.75 0 1 1-1.06-1.06l1.75-1.75a.75.75 0 0 1 1.06 0ZM2.5 8.75A.75.75 0 0 1 3.25 8h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm8.177-.264C9.822 7.752 8.5 8.36 8.5 9.487v11.274c0 1.21 1.495 1.782 2.302.88l2.614-2.923c.276-.308.664-.49 1.077-.507l3.84-.154c1.197-.048 1.715-1.539.805-2.32l-8.46-7.251ZM10 20.287V9.881l7.812 6.696l-3.38.135a3.026 3.026 0 0 0-2.133 1.006L10 20.287Z"
        ></path>
      </svg>
    );
  },
});
