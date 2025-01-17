import {useEffect, type FC} from "react";
import {amllInfoSizeAtom, consoleLog} from "./settings";

export const ExtensionContext: FC = () => {
    useEffect(() => {
        console.log("extension context has been mounted");
    }, []);

    useEffect(() => {
        const storedBoldTitleAtom = localStorage.getItem('amllBoldTitleAtom');
        consoleLog("INFO", "context", "storedBoldTitleAtom: " + storedBoldTitleAtom);
        if (storedBoldTitleAtom) {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('bold_title');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'bold_title';  // 设置 id
            if (storedBoldTitleAtom === "false") {
                styleElement.innerHTML = `
div[class^="_info"] > div[class*="_name"] {
    font-weight: 400 !important;
}
            `;
                consoleLog("INFO", "context", "取消粗体标题");
            } else {
                styleElement.innerHTML = `
div[class^="_info"] > div[class*="_name"] {
    font-weight: 500 !important;
}
            `;
                consoleLog("INFO", "context", "显示粗体标题");
            }
        }

        const storedAmllInfoSizeAtom = localStorage.getItem('amllInfoSizeAtom');
        consoleLog("INFO", "context", "storedAmllInfoSizeAtom: " + storedAmllInfoSizeAtom);
        if (storedAmllInfoSizeAtom) {
            const storedAmllInfoSize = storedAmllInfoSizeAtom.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('info_fonts');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'info_fonts';  // 设置 id
            styleElement.innerHTML = `
div[class^="_musicInfo"] > div[class^="_info"] {
    font-size: ${storedAmllInfoSize} !important;
}
            `;
        }

        const storedAmllMetaModAtom = localStorage.getItem('amllMetaModAtom');
        consoleLog("INFO", "context", "storedAmllMetaModAtom: " + storedAmllMetaModAtom);
        if (storedAmllMetaModAtom) {
            const storedLyricFontFamilyAtom = localStorage.getItem('amll-react-full.lyricFontFamily');
            if (storedLyricFontFamilyAtom) {
                const storedLyricFontFamily = storedLyricFontFamilyAtom.replace(/"/g, '');
                // 创建一个 <style> 标签，并为其设置 id
                let styleElement = document.getElementById('meta_fonts');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    // 将 <style> 标签添加到 head 中
                    document.head.appendChild(styleElement);
                }
                styleElement.id = 'meta_fonts';  // 设置 id
                if (storedAmllMetaModAtom != "false") {
                    styleElement.innerHTML = `
div.amll-lyric-player > div[class^="_lyricLine"]:empty + div[class^="_lyricLine"] > div[class^="_lyricMainLine"] > span {
    font-family: ${storedLyricFontFamily} !important;
}
div.amll-lyric-player > div[class^="_lyricLine"]:empty + div[class^="_lyricLine"]:has(+ div[style*="blur(2px)"]) {
    filter: blur(0px) !important;
}
                `;
                    consoleLog("INFO", "context", "还原元数据字体为：" + storedLyricFontFamily);
                } else {
                    let styleElement = document.getElementById('meta_fonts');
                    if (styleElement) document.head.removeChild(styleElement);
                    consoleLog("INFO", "context", "元数据未启用");
                }
            }
        }

        const storedAmllOrigHeightAtom = localStorage.getItem('amllOrigHeightAtom');
        consoleLog("INFO", "context", "storedAmllOrigHeightAtom: " + storedAmllOrigHeightAtom);
        if (storedAmllOrigHeightAtom) {
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('orig_height');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'orig_height';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricMainLine"] span[style^="mask-image"] {
    height: 1.25em !important;
}
            `
        }

        const storedAmllOrigFontsAtom = localStorage.getItem('amllOrigFontsAtom');
        consoleLog("INFO", "context", "storedAmllOrigFontsAtom: " + storedAmllOrigFontsAtom);
        if (storedAmllOrigFontsAtom) {
            const storedAmllOrigFonts = storedAmllOrigFontsAtom.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('orig_fonts');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'orig_fonts';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricMainLine"]:has(+ div[class*="_lyricSubLine"]:not(:empty) + div[class*="_lyricSubLine"]:not(:empty)) {
    font-family: ${storedAmllOrigFonts}, sans-serif !important;
}
            `;
        }

        const storedAmllTsFontsAtom = localStorage.getItem('amllTsFontsAtom');
        consoleLog("INFO", "context", "storedAmllTsFontsAtom: " + storedAmllTsFontsAtom);
        if (storedAmllTsFontsAtom) {
            const storedAmllTsFonts = storedAmllTsFontsAtom.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('ts_fonts');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'ts_fonts';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricMainLine"] + div[class*="_lyricSubLine"] {
    font-family: ${storedAmllTsFonts}, sans-serif !important;
}
            `;
        }

        const storedAmllRomaFontsAtom = localStorage.getItem('amllRomaFontsAtom');
        consoleLog("INFO", "context", "storedAmllRomaFontsAtom: " + storedAmllRomaFontsAtom);
        if (storedAmllRomaFontsAtom) {
            const storedAmllRomaFonts = storedAmllRomaFontsAtom.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('roma_fonts');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'roma_fonts';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricSubLine"] + div[class*="_lyricSubLine"] {
    font-family: ${storedAmllRomaFonts}, sans-serif !important;
}
            `;
        }
    }, []);

    return null;
}