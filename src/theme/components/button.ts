
const buttons = {

    variants: {

        brand: {
            bg: "brand.400",
            color: "white",
            boxShadow: "md",
            loadingText: "Submitting",
            transition: "all 0.2s cubic-bezier(.08,.52,.52,1)",
            _hover: {
                bg: "brand.200",
            },
            _active: {
                bg: "brand.500",
                transform: "scale(0.98)",
                borderColor: "brand.400",
            },
            _focus: {
                boxShadow:
                    "0px 1px 7px rgba(57, 70, 55, 0.08)",
            }

        },
        rgpButton: {
            bg: "brand.400",
            color: "white",
            _hover: {
                bg: "brand.200",
                color: 'white'
            }

        }
    }
};
export default buttons;