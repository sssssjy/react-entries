import { useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

const bgImage = require('../../images/bg.png')

const DotCanvas = () => {
    const dotCanvasRef = useRef<any>();
    const dotCanvas1Ref = useRef<any>();
    const imgInfoRef = useRef<any>()

    useEffect(() => {
        const img = new Image();
        img.src = bgImage;
        img.onload = () => {
            const canvas = dotCanvasRef.current;
            const imgWidth = img.width;
            const imgHeight = img.height;
            canvas.width = imgWidth;
            canvas.height = imgHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0); // 绘制图片
            setTimeout(() => {
                // 保存原始像素信息
                imgInfoRef.current = [...ctx.getImageData(0, 0, canvas.width, canvas.height).data];
                blackAndWhite()
            }, 1)
        }
    }, []);

    const blackAndWhite = () => {
        const canvas = dotCanvasRef.current;
        const ctx = canvas.getContext('2d');
        let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        let pixels = imageData.data

        // 处理像素点
        for (let i = 0; i < pixels.length; i += 4) {
            let r = pixels[i]
            let g = pixels[i + 1]
            let b = pixels[i + 2]

            // 灰色
            let gray = (r + g + b) / 3
            imageData.data[i] = gray
            imageData.data[i + 1] = gray
            imageData.data[i + 2] = gray
        }
        // 重新画图
        ctx.putImageData(imageData, 0, 0)
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader() as any;

        reader.onloadend = () => handleText(reader.result)

        reader.readAsText(file);
    };

    const handleText = textStr => {
        const list = textStr.split('\r\n');
        // console.log(`list`, list);
        const canvas = dotCanvasRef.current;
        const ctx = canvas.getContext('2d');

        const canvas1 = dotCanvas1Ref.current;
        const ctx1 = canvas1.getContext('2d');

        list.forEach(str => {
            ctx.beginPath()
            const info = str.split(',');
            ctx.strokeStyle = '#f40';
            ctx.fiilStyle = '#f40';
            if (info.length < 3) return;
            ctx.moveTo(+info[0], +info[1])  // 将笔尖移动到 100 100 的位置
            ctx.lineTo(+info[0] + 1, +info[1] + 1)  // 将要绘制到的位置
            ctx.stroke() // 绘制
            ctx.closePath();

            ctx1.beginPath()
            ctx1.strokeStyle = '#f40';
            ctx1.fiilStyle = '#f40';
            if (info.length < 3) return;
            ctx1.moveTo(+info[0], +info[1])  // 将笔尖移动到 100 100 的位置
            ctx1.lineTo(+info[0] + 1, +info[1] + 1)  // 将要绘制到的位置
            ctx1.stroke() // 绘制
            ctx1.closePath();
        })
    }

    return <div>
        <Container maxWidth="md" sx={{ mt: 8 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
                <label htmlFor="upload-image">
                    <Button variant="contained" component="span">
                        Upload
                    </Button>
                    <input
                        id="upload-image"
                        hidden
                        type="file"
                        onChange={handleFileUpload}
                    />
                </label>
            </Stack>
        </Container>

        <canvas
            id="dotCanvas"
            ref={dotCanvasRef}
            width={964}
            height={589}
            style={{
                border: '1px solid #d3d3d3'
            }}
        />


        <canvas
            ref={dotCanvas1Ref}
            width={964}
            height={589}
            style={{
                border: '1px solid #d3d3d3'
            }}
        />
    </div>
}

export default DotCanvas