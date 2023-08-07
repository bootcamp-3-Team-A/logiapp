import { ArrowUpIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const TopButton: React.FC = () => {
    const [showButton, setShowButton] = useState(false);
    // スクロール量が300pxを超えると、showButtonはtrueになり、トップへ戻るアイコンが表示
    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // トップへ戻るアイコンがクリックされた時に実行
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <IconButton
            icon={<ArrowUpIcon />}//アイコン
            size="lg"
            onClick={handleScrollToTop}
            position="fixed"
            bottom="30px"
            right="30px"
            display={showButton ? "block" : "none"} aria-label={""} />
    );
};

export default TopButton;
