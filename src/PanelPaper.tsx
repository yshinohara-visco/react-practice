import React, { useRef, useEffect, useState } from "react";
import { Stack } from "@mui/material";
import Paper from "paper";
import { PanelEraser, PanelPen, PanelUndoRedo } from "./Tools";

export const PanelPaper = () => {
    //仮画像のロード
    const [img, setImg] = useState<HTMLImageElement | null>(null);
    useEffect(() => {
        const img = new Image();
        img.src = "res/hoge.bmp";
        img.onload = () => {
            setImg(img);
        };
    }, []);

    return (
        <Stack>
            上手くいきそうで上手くいかないので断念
            <CanvasPaper img={img} />
        </Stack>
    );
};

const CanvasPaper = (props: { img: HTMLImageElement | null }) => {
    const { img } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        console.log("PanelPaper: useEffect");

        if (!img) return;

        Paper.setup("paper-canvas");

        const raster = new Paper.Raster(img);
        raster.position = Paper.view.center;

        const layer = new Paper.Layer();
        layer.opacity = 0.5;

        Paper.view.onMouseLeave = () => {
            console.log("onMouseLeave");

            const curosor = Paper.project.getItem({
                name: "cursor",
            });
            if (curosor) {
                curosor.remove();
            }
        };

        return () => {
            Paper.project.clear();
            Paper.view.remove();
        };
    }, [img]);

    return (
        <Stack>
            {img && (
                <canvas
                    ref={canvasRef}
                    id="paper-canvas"
                    style={{
                        border: "1px solid blue",
                        backgroundColor: "lightgreen",
                        width: 800,
                        height: 500,
                    }}
                />
            )}
            <Stack direction="row">
                <PanelPen />
                <PanelEraser />
                <PanelUndoRedo />
            </Stack>
        </Stack>
    );
};
