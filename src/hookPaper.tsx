import { useEffect } from "react";
import Paper from "paper";

const usePaper = (props: { propsCanvas: any }) => {
    const canvas = (
        <canvas
            style={{ backgroundColor: "lightgray" }}
            {...props.propsCanvas}
            id="paper-canvas"
        />
    );

    useEffect(() => {
        console.log("PanelPaper: useEffect");
        Paper.setup("paper-canvas");

        return () => {
            Paper.project.clear();
            Paper.view.remove();
        };
    }, []);

    return { canvas };
};
