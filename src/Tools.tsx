import React, { useRef, useEffect, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import Paper from "paper";

export const PanelPen = (props: {}) => {
    const [penSize, setPenSize] = useState(3);
    const toolRef = useRef(new Paper.Tool());

    useEffect(() => {
        console.log("PanelPen: useEffect");

        const tool = toolRef.current;
        tool.onMouseMove = (event: paper.MouseEvent) => {
            console.log("onMouseMove");
            const cursor = new Paper.Path.Circle({
                name: "cursor",
                center: event.point,
                radius: penSize / 2,
                strokeColor: "black",
                dashArray: [1, 3],
            });
            cursor.removeOn({
                move: true,
                down: true,
            });
        };
        tool.onMouseDown = (event: paper.MouseEvent) => {
            const path = new Paper.Path();
            path.strokeColor = new Paper.Color("rgba(255, 0, 0, 1)");
            path.strokeWidth = penSize;
            path.strokeCap = "round";
            path.strokeJoin = "round";
            path.add(event.point);
            path.add(event.point);
        };
        tool.onMouseDrag = (event: paper.MouseEvent) => {
            const path = Paper.project.activeLayer.lastChild as paper.Path;
            path.add(event.point);
        };
        tool.onMouseUp = (event: paper.MouseEvent) => {
            const path = Paper.project.activeLayer.lastChild as paper.Path;
            path.rasterize();
            path.remove();
        };
    }, [penSize]);

    const handleClick = () => {
        toolRef.current.activate();
    };

    return (
        <Stack width={100} border={1}>
            <TextField
                type="number"
                value={penSize}
                onChange={(event) => {
                    const value = event.target.value;
                    setPenSize(parseInt(value));
                }}
            />

            <Button onClick={handleClick}>pen</Button>
            <Button
                onClick={() => {
                    console.log(
                        "children=",
                        Paper.project.activeLayer.children
                    );
                }}
            />
        </Stack>
    );
};

export const PanelEraser = () => {
    const [penSize, setPenSize] = useState(3);
    const toolRef = useRef(new Paper.Tool());

    useEffect(() => {
        console.log("PanelEraser: useEffect");
        const tool = toolRef.current;
        tool.onMouseMove = (event: paper.MouseEvent) => {
            const cursor = new Paper.Path.Circle({
                center: event.point,
                radius: penSize / 2,
                strokeColor: "white",
                dashArray: [1, 3],
            });
            cursor.removeOn({
                move: true,
                down: true,
                drag: true,
                up: true,
            });
            cursor.onMouseLeave = () => {
                cursor.remove();
            };
        };
        tool.onMouseDown = (event: paper.MouseEvent) => {
            const path = new Paper.Path();
            path.strokeColor = new Paper.Color("rgba(0,0,0,1)");
            path.strokeWidth = penSize;
            path.strokeCap = "round";
            path.strokeJoin = "round";
            path.blendMode = "destination-out";
            path.add(event.point);
            path.add(event.point);
        };
        tool.onMouseDrag = (event: paper.MouseEvent) => {
            const path = Paper.project.activeLayer.lastChild as paper.Path;
            path.add(event.point);
        };
    }, [penSize]);

    const handleClick = () => {
        toolRef.current.activate();
    };

    return (
        <Stack width={100} border={1}>
            <TextField
                type="number"
                value={penSize}
                onChange={(event) => {
                    const value = event.target.value;
                    setPenSize(parseInt(value));
                }}
            />

            <Button onClick={handleClick}>eraser2</Button>
        </Stack>
    );
};

export const PanelUndoRedo = () => {
    const [redoStack, setRedoStack] = useState<string[]>([]);

    const handleUndo = () => {
        const lastChild = Paper.project.activeLayer.lastChild;
        if (lastChild === null) return;

        setRedoStack((prev) => [...prev, lastChild.exportJSON()]);
        lastChild.remove();
    };
    const handleRedo = () => {
        if (redoStack.length > 0) {
            const json = redoStack[redoStack.length - 1];
            Paper.project.activeLayer.addChild(
                new Paper.Path().importJSON(json)
            );
            setRedoStack((prev) => prev.slice(0, prev.length - 1));
        }
    };

    return (
        <Stack width={100} border={1}>
            <Button onClick={handleUndo}>undo</Button>
            <Button onClick={handleRedo}>redo</Button>
            <Button
                onClick={() => {
                    Paper.view.zoom += 0.1;
                }}
            >
                +
            </Button>
            <Button
                onClick={() => {
                    Paper.view.zoom -= 0.1;
                }}
            >
                -
            </Button>
        </Stack>
    );
};
