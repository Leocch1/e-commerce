export const COUPON_CODES = {
    JANUARY1: "JANUARY1",
    FEBRUARY2: "FEBRUARY2",
    MARCH3: "MARCH3",
    APRIL4: "APRIL4",
    MAY5: "MAY5",
    JUNE6: "JUNE6",
    JULY7: "JULY7",
    AUGUST8: "AUGUST8",
    SEPTEMBER9: "SEPTEMBER9",
    OCTOBER10: "OCTOBER10",
    NOVEMBER11: "NOVEMBER11",
    DECEMBER12: "DECEMBER12",
} as const

export type CouponCode = keyof typeof COUPON_CODES;