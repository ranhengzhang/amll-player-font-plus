import {useEffect, type FC} from "react";
import {consoleLog} from "./settings";

export const ExtensionContext: FC = () => {
    useEffect(() => {
        console.log("extension context has been mounted");
    }, []);

    useEffect(() => {
        const storedLyricFontFamilyAtom = localStorage.getItem('amll-react-full.lyricFontFamily');
        const storedLyricSwappedAtom = localStorage.getItem('amll-react-full.enableLyricSwapTransRomanLineAtom');
        const getSwapped = ((storedLyricSwappedAtom: string)=>{
            let val = false;
            if (storedLyricSwappedAtom) {
                const storedLyricSwapped = storedLyricSwappedAtom?.replace(/"/g, '');
                val = storedLyricSwapped !== "false";
            }
            consoleLog("LOG", "font", "swapped: " + (storedLyricSwappedAtom??val));
            return ()=>val;
        })(storedLyricSwappedAtom);

        if (storedLyricFontFamilyAtom) {
            const storedLyricFontFamily = storedLyricFontFamilyAtom?.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('fix_fonts');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'fix_fonts';  // 设置 id
            styleElement.innerHTML = `
div.amll-lyric-player {
    font-family: ${storedLyricFontFamily};
}
            `;
            consoleLog("LOG", "font", "还原歌词字体为"+storedLyricFontFamily);
        }

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
                consoleLog("LOG", "title", "取消粗体标题");
            } else {
                styleElement.innerHTML = `
div[class^="_info"] > div[class*="_name"] {
    font-weight: 500 !important;
}
            `;
                consoleLog("LOG", "title", "显示粗体标题");
            }
        }

        const storedAmllInfoFontsAtom = localStorage.getItem('amllInfoFontsAtom');
        const storedAmllInfoSizeAtom = localStorage.getItem('amllInfoSizeAtom');
        consoleLog("INFO", "context", "storedAmllInfoFontsAtom: " + storedAmllInfoFontsAtom);
        consoleLog("INFO", "context", "storedAmllInfoSizeAtom: " + storedAmllInfoSizeAtom);
        if (storedAmllInfoFontsAtom || storedAmllInfoSizeAtom) {
            const storedAmllInfoFonts = storedAmllInfoFontsAtom?.replace(/"/g, '');
            const storedAmllInfoSize = storedAmllInfoSizeAtom?.replace(/"/g, '');
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
    ${storedAmllInfoSize?`font-size: ${storedAmllInfoSize} !important;`:'/* No Fonts */'}
    ${storedAmllInfoFonts?`font-family: ${storedAmllInfoFonts} !important;`:'/* No Size */'}
}
            `;
        }

        const storedAmllMetaModAtom = localStorage.getItem('amllMetaModAtom');
        consoleLog("INFO", "context", "storedAmllMetaModAtom: " + storedAmllMetaModAtom);
        if (storedAmllMetaModAtom) {
            if (storedLyricFontFamilyAtom) {
                const storedLyricFontFamily = storedLyricFontFamilyAtom?.replace(/"/g, '');
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
                    consoleLog("LOG", "meta", "还原元数据字体为：" + storedLyricFontFamily);
                } else {
                    let styleElement = document.getElementById('meta_fonts');
                    if (styleElement) document.head.removeChild(styleElement);
                    consoleLog("LOG", "meta", "元数据未启用");
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
    min-height: 1.25em !important;
}
            `
        }

        const storedAmllOrigSizeAtom = localStorage.getItem('amllOrigSizeAtom');
        consoleLog("INFO", "context", "storedAmllOrigSizeAtom: " + storedAmllOrigSizeAtom);
        if (storedAmllOrigSizeAtom) {
            const storedAmllOrigSize = storedAmllOrigSizeAtom?.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('orig_size');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'orig_size';  // 设置 id
            styleElement.innerHTML = `
.amll-lyric-player {
    font-size: ${storedAmllOrigSize} !important;
}
`;
        }

        const storedAmllBgSizeAtom = localStorage.getItem('amllBgSizeAtom');
        const storedAmllBgScaleAtom = localStorage.getItem('amllBgScaleAtom');
        consoleLog("INFO", "context", "storedAmllBgSizeAtom: " + storedAmllBgSizeAtom);
        consoleLog("INFO", "context", "storedAmllBgScaleAtom: " + storedAmllBgScaleAtom);
        if (storedAmllBgSizeAtom || storedAmllBgScaleAtom) {
            const storedAmllBgSize = storedAmllBgSizeAtom?.replace(/"/g, '');
            const storedAmllBgScale = parseInt(storedAmllBgSizeAtom);
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('bg_size');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'bg_size';  // 设置 id
            styleElement.innerHTML = `
${storedAmllBgSize?`div.amll-lyric-player > div[class*="_lyricBgLine"] > div {
    font-size: ${storedAmllBgSize} !important;
}`:``}
${storedAmllBgScale>0?`div.amll-lyric-player > div[class*="_lyricBgLine"] > div:not(:first-child) {
    font-size: ${storedAmllBgScale}em !important;
}
`:``}`;
        }

        const storedAmllOrigFontsAtom = localStorage.getItem('amllOrigFontsAtom');
        const storedAmllSpaceWidthAtom = localStorage.getItem('amllSpaceWidthAtom');
        const storedAmllAnyLangAtom = localStorage.getItem('amllAnyLangAtom');
        consoleLog("INFO", "context", "storedAmllOrigFontsAtom: " + storedAmllOrigFontsAtom);
        consoleLog("INFO", "context", "storedAmllSpaceWidthAtom: " + storedAmllSpaceWidthAtom);
        consoleLog("INFO", "context", "storedAmllAnyLangAtom: " + storedAmllAnyLangAtom);
        if (storedAmllOrigFontsAtom || storedAmllSpaceWidthAtom) {
            const storedAmllOrigFonts = storedAmllOrigFontsAtom?.replace(/"/g, '');
            const storedAmllSpaceWidth = storedAmllSpaceWidthAtom?.replace(/"/g, '');
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
    ${storedAmllOrigFonts ? `font-family: ${storedAmllOrigFonts}, sans-serif !important;` : "/* No Fonts Info */"}
}

div[class*="_lyricMainLine"]${storedAmllAnyLangAtom ? '' : ':has(+ div[class*="_lyricSubLine"]:not(:empty) + div[class*="_lyricSubLine"]:not(:empty))'} {
    ${storedAmllSpaceWidth ? `word-spacing: ${storedAmllSpaceWidth} !important;` : "/* No Space Info */"}
}
            `;
        }

        const storedAmllTsFontsAtom = localStorage.getItem('amllTsFontsAtom');
        consoleLog("INFO", "context", "storedAmllTsFontsAtom: " + storedAmllTsFontsAtom);
        if (storedAmllTsFontsAtom) {
            const storedAmllTsFonts = storedAmllTsFontsAtom?.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('ts_fonts');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'ts_fonts';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricLine"] > div:nth-child(` + (getSwapped() ? 2 : 1) + ` of div[class*="_lyricSubLine"]) {
    font-family: ${storedAmllTsFonts}, sans-serif !important;
}
            `;
        }

        const storedAmllTsSizeAtom = localStorage.getItem('amllTsSizeAtom');
        consoleLog("INFO", "context", "storedAmllTsSizeAtom: " + storedAmllTsSizeAtom);
        if (storedAmllTsSizeAtom) {
            const storedAmllTsSize = storedAmllTsSizeAtom?.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('ts_size');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'ts_size';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricLine"]:not(div[class*="_lyricBgLine"]) > div:nth-child(` + (getSwapped() ? 2 : 1) + ` of div[class*="_lyricSubLine"]) {
    ${storedAmllTsSize ? `--amll-lp-secondary-font-size: ${storedAmllTsSize} !important;` : ""}
}
            `;
        }

        const storedAmllRomaFontsAtom = localStorage.getItem('amllRomaFontsAtom');
        consoleLog("INFO", "context", "storedAmllRomaFontsAtom: " + storedAmllRomaFontsAtom);
        if (storedAmllRomaFontsAtom) {
            const storedAmllRomaFonts = storedAmllRomaFontsAtom?.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('roma_fonts');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'roma_fonts';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricLine"] > div:nth-child(` + (getSwapped() ? 1 : 2) + ` of div[class*="_lyricSubLine"]) {
    ${storedAmllRomaFonts ? `font-family: ${storedAmllRomaFonts}, sans-serif !important;` : ""}
}
            `;
        }

        const storedAmllRomaSizeAtom = localStorage.getItem('amllRomaSizeAtom');
        consoleLog("INFO", "context", "storedAmllRomaSizeAtom: " + storedAmllRomaSizeAtom);
        if (storedAmllRomaSizeAtom) {
            const storedAmllRomaSize = storedAmllRomaSizeAtom?.replace(/"/g, '');
            // 创建一个 <style> 标签，并为其设置 id
            let styleElement = document.getElementById('roma_size');
            if (!styleElement) {
                styleElement = document.createElement('style');
                // 将 <style> 标签添加到 head 中
                document.head.appendChild(styleElement);
            }
            styleElement.id = 'roma_size';  // 设置 id
            styleElement.innerHTML = `
div[class*="_lyricLine"]:not(div[class*="_lyricBgLine"]) > div:nth-child(` + (getSwapped() ? 1 : 2) + ` of div[class*="_lyricSubLine"]) {
    --amll-lp-secondary-font-size: ${storedAmllRomaSize} !important;
}
            `;
        }
    }, []);

    return null;
}