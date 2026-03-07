import type { IconProps } from "@/types"

export const BusinessIcons = {
  curvedBanner: (props: IconProps) => (
    <svg
      width="450"
      height="121"
      fill="none"
      viewBox="0 0 450 121"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_3272_2624)">
        <path
          fill="var(--template-background)"
          d="M225.254 105.5C311.082 105.5 395.111 60.7415 450 4V121H0V4C54.8887 60.7414 139.425 105.5 225.254 105.5Z"
        />
        <rect x="0" y="105.5" width="450" height="15.5" fill="var(--template-background)" />
        <path
          strokeWidth="12"
          d="M455 6.10447C399.143 64.8219 314.649 110 227.307 110C139.965 110 50.8569 64.7174 -5 6"
          stroke="var(--template-primary)"
        />
      </g>
      <defs>
        <clipPath id="clip0_3272_2624">
          <rect width="450" height="121" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),

  ellipseBanner: (props: IconProps) => (
    <svg
      fill="none"
      width="100%"
      height="116"
      viewBox="0 0 390 116"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      {...props}
    >
      <path
        d="M74.0778 100.095C56.0583 98.3839 36.4375 98.7443 13.7056 85.4164C7.91231 82.0198 0 85.8806 0 92.5962V116L390 116V9.03379C390 5.0542 386.991 1.65131 383.036 1.21357C252.414 -13.2422 220.433 106.343 74.0778 100.095Z"
        fill="white"
      />
    </svg>
  ),
}
