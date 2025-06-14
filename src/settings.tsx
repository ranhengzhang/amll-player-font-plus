import {atomWithStorage} from "jotai/utils";
import {atom, useAtom} from "jotai";
import React, {useEffect, type FC, PropsWithChildren, useState} from "react";
import {Card, Flex, Separator, Switch, Text, TextField, TextProps} from "@radix-ui/themes";
import chalk from "chalk";
import {context} from "esbuild";

const WARN_TAG = chalk.bgHex("#de2a18").hex("#FFFFFF")(" WARN ");
const INFO_TAG = chalk.bgHex("#2376b7").hex("#FFFFFF")(" INFO ");
const LOG_TAG = chalk.bgHex("#1ba784").hex("#FFFFFF")(" LOG ");
const NAME_TAG = chalk.bgHex("#737c7b").hex("#FFFFFF")(" FONT ");

function getChalk(bg: string, fg: string, part: string) {
    return chalk.bgHex(bg).hex(fg)(` ${part} `);
}

export function consoleLog(type: string, part: string, info: string) {

    const PART_TAG = getChalk("#1a6840", "#FFFFFF", part);
    if (type === "INFO") {
        console.log(NAME_TAG + INFO_TAG + PART_TAG, info)

    } else if (type === "WARN") {
        console.log(NAME_TAG + WARN_TAG + PART_TAG, info)

    } else if (type === "LOG") {
        console.log(NAME_TAG + LOG_TAG + PART_TAG, info)

    } else {
        console.log(NAME_TAG + NAME_TAG + PART_TAG, info)
    }

}

export const SettingPage: FC = () => {
    const [amllBoldTitle, setAmllBoldTitle] = useAtom(amllBoldTitleAtom);
    const [amllInfoFonts, setAmllInfoFonts] = useAtom(amllInfoFontsAtom);
    const [amllInfoSize, setAmllInfoSize] = useAtom(amllInfoSizeAtom);
    const [amllMetaMod, setAmllMetaMod] = useAtom(amllMetaModAtom);
    const [amllOrigSize, setAmllOrigSize] = useAtom(amllOrigSizeAtom);
    const [amllOrigHeight, setAmllOrigHeight] = useAtom(amllOrigHeightAtom);
    const [amllOrigFonts, setAmllOrigFonts] = useAtom(amllOrigFontsAtom);
    const [amllSpaceWidth, setAmllSpaceWidth] = useAtom(amllSpaceWidthAtom);
    const [amllAnyLang, setAmllAnyLang] = useAtom(amllAnyLangAtom);
    const [amllTsFonts, setAmllTsFonts] = useAtom(amllTsFontsAtom);
    const [amllTsSize, setAmllTsSize] = useAtom(amllTsSizeAtom);
    const [amllRomaFonts, setAmllRomaFonts] = useAtom(amllRomaFontsAtom);
    const [amllRomaSize, setAmllRomaSize] = useAtom(amllRomaSizeAtom);
    const [amllSwapped, setAmllSwapped] = useAtom(enableLyricSwapTransRomanLineAtom)

    function setAmllBoldTitleFunc(bold: boolean) {
        setAmllBoldTitle(bold);

        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('bold_title');
        if (!styleElement) {
            styleElement = document.createElement('style');
            // 将 <style> 标签添加到 head 中
            document.head.appendChild(styleElement);
        }
        styleElement.id = 'bold_title';  // 设置 id
        if (bold === false) {
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

    let info_timeout = null;
    let [setAmllInfoFontsFunc, setAmllInfoSizeFunc] = (() => {
        let info_fonts = amllInfoFonts;
        let info_size = amllInfoSize;
        let set_info = (log:()=>void)=>{
            if (info_timeout) clearTimeout(info_timeout);
            info_timeout = setTimeout(()=>{
                log()
                // 创建一个 <style> 标签，并为其设置 id
                let styleElement = document.getElementById('info_fonts');
                if (info_fonts || info_size) {
                    if (!styleElement) {
                        styleElement = document.createElement('style');
                        // 将 <style> 标签添加到 head 中
                        document.head.appendChild(styleElement);
                    }
                    styleElement.id = 'info_fonts';  // 设置 id
                    styleElement.innerHTML = `
div[class^="_musicInfo"] > div[class^="_info"] {
    ${info_size?`font-size: ${info_size} !important;`:'/* No Fonts */'}
    ${info_fonts?`font-family: ${info_fonts} !important;`:'/* No Size */'}
}
`
                } else {
                    if (styleElement) {
                        document.head.removeChild(styleElement);
                    }
                }
            }, 800);
        }

        return [(family: string) => {
            setAmllInfoFonts(family);
            info_fonts = family;
            set_info(()=>consoleLog("INFO", "context", "AmllInfoFontsAtom: " + info_fonts));
        }, (size: string) => {
            setAmllInfoSize(size);
            info_size = size;
            set_info(()=>consoleLog("INFO", "context", "AmllInfoSizeAtom: " + info_size));
        }]
    })();

    function setAmllMetaModFunc(meta: boolean) {
        setAmllMetaMod(meta);

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
            if (meta) {
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

    let orig_timeout = null;
    let setAmllOrigSizeFunc = (()=> {
        return (size: string) => {
            setAmllOrigSize(size);

            if (orig_timeout) clearTimeout(orig_timeout);
            orig_timeout = setTimeout(()=> {
                consoleLog("INFO", "context", "AmllOrigSizeAtom: " + size);
                if (size) {
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
    font-size: ${size} !important;
}
`;
                } else {
                    let styleElement = document.getElementById('orig_size');
                    if (styleElement) document.head.removeChild(styleElement);
                }
            }, 800)
        };
    })();

    function setAmllOrigHeightFunc(fix: boolean) {
        setAmllOrigHeight(fix);

        // 创建一个 <style> 标签，并为其设置 id
        let styleElement = document.getElementById('orig_height');
        if (fix) {
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
`;
            consoleLog("LOG", "orig", "原文行高修复开启。");
        } else {
            if (styleElement) {
                document.head.removeChild(styleElement);
            }
            consoleLog("LOG", "orig", "原文行高修复关闭。");
        }
    }

    let lang_timeout = null;
    let [setAmllOrigFontsFunc, setAmllSpaceWidthFunc, setAmllAnyLangFunc] = (()=>{
        let orig_fonts = amllOrigFonts;
        let space_width = amllSpaceWidth;
        let any_lang = amllAnyLang;
        let set_orig = (log:()=>void)=>{
            if (lang_timeout) clearTimeout(lang_timeout);
            lang_timeout = setTimeout(()=>{
                log()
                // 创建一个 <style> 标签，并为其设置 id
                let styleElement = document.getElementById('orig_fonts');
                if (orig_fonts || space_width) {
                    if (!styleElement) {
                        styleElement = document.createElement('style');
                        // 将 <style> 标签添加到 head 中
                        document.head.appendChild(styleElement);
                    }
                    styleElement.id = 'orig_fonts';  // 设置 id
                    styleElement.innerHTML = `
div[class*="_lyricMainLine"]:has(+ div[class*="_lyricSubLine"]:not(:empty) + div[class*="_lyricSubLine"]:not(:empty)) {
    ${orig_fonts ? `font-family: ${orig_fonts}, sans-serif !important;` : "/* No Fonts Info */"}
}

div[class*="_lyricMainLine"]${any_lang ? '' : ':has(+ div[class*="_lyricSubLine"]:not(:empty) + div[class*="_lyricSubLine"]:not(:empty))'} {
    ${space_width ? `word-spacing: ${space_width} !important;` : "/* No Space Info */"}
}
`;
                } else {
                    if (styleElement) {
                        document.head.removeChild(styleElement);
                    }
                }
            }, 800);
        }

        return [(family: string) =>{
            setAmllOrigFonts(family);
            orig_fonts = family;
            set_orig(()=>consoleLog("INFO", "context", "AmllOrigFontsAtom: " + orig_fonts))
        }, (width: string)=>{
            setAmllSpaceWidth(width);
            space_width = width;
            set_orig(()=>consoleLog("INFO", "context", "AmllSpaceWidthAtom: " + space_width));
        }, (restrict: boolean)=>{
            setAmllAnyLang(restrict);
            any_lang = restrict;
            set_orig(()=>consoleLog("LOG", "context", "AmllAnyLang: " + any_lang));
        }];
    })();

    let ts_timeout = null;
    let [setAmllTsFontsFunc, setAmllTsSizeFunc] = (() => {
        let ts_fonts = amllTsFonts;
        let ts_size = amllTsSize;
        let set_ts = (log: () => void) => {
            if (ts_timeout) clearTimeout(ts_timeout);
            ts_timeout = setTimeout(() => {
                log()
                // 创建一个 <style> 标签，并为其设置 id
                let styleElement = document.getElementById('ts_fonts');
                if (ts_fonts || ts_size) {
                    if (!styleElement) {
                        styleElement = document.createElement('style');
                        // 将 <style> 标签添加到 head 中
                        document.head.appendChild(styleElement);
                    }
                    styleElement.id = 'ts_fonts';  // 设置 id
                    styleElement.innerHTML = `
div[class*="_lyricMainLine"] + div[class*="_lyricSubLine"] {
    ${ts_fonts ? `font-family: ${ts_fonts}, sans-serif !important;` : "/* No Fonts Info */"}
    ${ts_size ? `font-size: ${ts_size} !important;` : "/* No Size Info */"}
}
`;
                } else {
                    if (styleElement) {
                        document.head.removeChild(styleElement);
                    }
                }
            }, 800);
        }

        return [(family: string) => {
            setAmllTsFonts(family);
            ts_fonts = family;
            set_ts(() => consoleLog("INFO", "context", "AmllTsFontsAtom: " + ts_fonts));
        }, (size: string) => {
            setAmllTsSize(size);
            ts_size = size;
            set_ts(() => consoleLog("INFO", "context", "AmllTsSizeAtom: " + ts_size));
        }];
    })();

    let roma_timeout = null;
    let [setAmllRomaFontsFunc, setAmllRomaSizeFunc] = (() => {
        let roma_fonts = amllRomaFonts;
        let roma_size = amllRomaSize;
        let set_roma = (log: () => void) => {
            if (roma_timeout) clearTimeout(roma_timeout);
            roma_timeout = setTimeout(() => {
                log();
                // 创建一个 <style> 标签，并为其设置 id
                let styleElement = document.getElementById('roma_fonts');
                if (roma_fonts || roma_size) {
                    if (!styleElement) {
                        styleElement = document.createElement('style');
                        // 将 <style> 标签添加到 head 中
                        document.head.appendChild(styleElement);
                    }
                    styleElement.id = 'roma_fonts';  // 设置 id
                    styleElement.innerHTML = `
div[class*="_lyricSubLine"] + div[class*="_lyricSubLine"] {
    ${roma_fonts ? `font-family: ${roma_fonts}, sans-serif !important;` : "/* No Fonts Info */"}
    ${roma_size ? `font-size: ${roma_size} !important;` : "/* No Size Info */"}
}
`;
                } else {
                    if (styleElement) {
                        document.head.removeChild(styleElement);
                    }
                }
            }, 800);
        }

        return [(family: string) => {
            setAmllRomaFonts(family);
            roma_fonts = family;
            set_roma(() => consoleLog("INFO", "context", "AmllRomaFontsAtom: " + roma_fonts));
        }, (size: string) => {
            setAmllRomaSize(size);
            roma_size = size;
            set_roma(() => consoleLog("INFO", "context", "AmllRomaSizeAtom: " + roma_size));
        }];
    })();

    useEffect(() => {
        console.log("SettingPage Loaded");
    }, []);

    // 前置组件
    const SubTitle: FC<PropsWithChildren<TextProps>> = ({children, ...props}) => {
        return (
            <Text weight="bold" size="4" my="4" as="div" {...props}>
                {children}
            </Text>
        );
    };

    consoleLog("INFO", "context", "AmllSwapped: " + amllSwapped);

    return (<div>
        <SubTitle>歌曲信息部分设置</SubTitle>
        <Card mt="2">
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">标题字体</Text>
                </Flex>
                <TextField.Root
                    value={amllInfoFonts}
                    onChange={(e) => setAmllInfoFontsFunc(e.currentTarget.value)}
                />
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">标题大小</Text>
                </Flex>
                <TextField.Root
                    value={amllInfoSize}
                    onChange={(e) => setAmllInfoSizeFunc(e.currentTarget.value)}
                />
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">启用粗体标题</Text>
                </Flex>
                <Switch checked={amllBoldTitle}
                        onCheckedChange={(e) => setAmllBoldTitleFunc(e)}/>
            </Flex>
            <Flex direction="column" align="center" my="2">
                <Text as="div" className="_musicInfo">
                    <Text as="div" className="_info">
                        <span>012 </span>
                        <span>Abĉ </span>
                        <span>冷电骨 </span>
                        <span>あの<ruby>日<rt>ひ</rt></ruby>々 </span>
                        <span>한국어 </span>
                        <span>🎂🍱🍸</span>
                    </Text>
                </Text>
            </Flex>
        </Card>

        <SubTitle>逐字歌词部分设置</SubTitle>
        <Card mt="2">
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">清除元数据行效果</Text>
                </Flex>
                <Switch checked={amllMetaMod}
                        onCheckedChange={(e) => setAmllMetaModFunc(e)}/>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">修复原文行高</Text>
                </Flex>
                <Switch checked={amllOrigHeight}
                        onCheckedChange={(e) => setAmllOrigHeightFunc(e)}/>
            </Flex>
            <Separator my="3" size="4" />
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">原文字体大小</Text>
                </Flex>
                <Flex direction="column"  width="60%">
                    <TextField.Root
                        value={amllOrigSize}
                        onChange={(e) => setAmllOrigSizeFunc(e.currentTarget.value)}
                    />
                </Flex>
            </Flex>
            <Separator my="3" size="4" />
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">特殊语言字体</Text>
                </Flex>
                <Flex direction="column"  width="60%">
                    <TextField.Root
                        value={amllOrigFonts}
                        onChange={(e) => setAmllOrigFontsFunc(e.currentTarget.value)}
                    />
                </Flex>
            </Flex>
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">特殊语言中的空格宽度</Text>
                </Flex>
                <TextField.Root
                    value={amllSpaceWidth}
                    onChange={(e) => setAmllSpaceWidthFunc(e.currentTarget.value)}
                />
                <Switch checked={amllAnyLang}
                        onCheckedChange={(e)=>setAmllAnyLangFunc(e)}/>
                <Text as="div">扩展到所有语言</Text>
            </Flex>
            <Separator my="3" size="4" />
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">{amllSwapped?'翻译':'音译'}行字体</Text>
                </Flex>
                <Flex direction="column" width="60%">
                    <TextField.Root
                        value={amllTsFonts}
                        onChange={(e) => setAmllTsFontsFunc(e.currentTarget.value)}
                    />
                </Flex>
            </Flex>
            <Flex>
                <Flex direction="column" flexGrow="1">
                    <Text as="div">{amllSwapped?'翻译':'音译'}行字号</Text>
                </Flex>
                <TextField.Root
                    value={amllTsSize}
                    onChange={(e) => setAmllTsSizeFunc(e.currentTarget.value)}
                />
            </Flex>
            <Separator my="3" size="4" />
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">{amllSwapped?'音译':'翻译'}行字体</Text>
                </Flex>
                <Flex direction="column"  width="60%">
                    <TextField.Root
                        value={amllRomaFonts}
                        onChange={(e) => setAmllRomaFontsFunc(e.currentTarget.value)}
                    />
                </Flex>
            </Flex>
            <Flex>
                <Flex direction="column" flexGrow="1">
                    <Text as="div">{amllSwapped?'音译':'翻译'}行字号</Text>
                </Flex>
                <TextField.Root
                    value={amllRomaSize}
                    onChange={(e) => setAmllRomaSizeFunc(e.currentTarget.value)}
                />
            </Flex>
            <Separator my="3" size="4" />
            <Flex direction="column" align="start" my="2">
                <Text as="div" className="_lyricMainLine" size="7">
                    <span>012 </span>
                    <span>Abĉ </span>
                    <span>冷电骨 </span>
                    <span>あの<ruby>日<rt>ひ</rt></ruby>々 </span>
                    <span>한국어 </span>
                    <span>🎂🍱🍸</span>
                </Text>
                <Text as="div" className="_lyricSubLine" size="6">012 Abĉ 冷电骨 🎂🍱🍸</Text>
                <Text as="div" className="_lyricSubLine" size="6">012 Abĉ 🎂🍱🍸</Text>
            </Flex>
        </Card>
    </div>)
}

export const amllBoldTitleAtom = atomWithStorage(
    "amllBoldTitleAtom",
    false,
);

export const amllInfoFontsAtom = atomWithStorage(
    "amllInfoFontsAtom",
    "",
)

export const amllInfoSizeAtom = atomWithStorage(
    "amllInfoSizeAtom",
    "",
)

export const amllMetaModAtom = atomWithStorage(
    "amllMetaModAtom",
    false,
)

export const amllOrigSizeAtom = atomWithStorage(
    "amllOrigSizeAtom",
    "",
)

export const amllOrigHeightAtom = atomWithStorage(
    "amllOrigHeightAtom",
    false,
)

export const amllOrigFontsAtom = atomWithStorage(
    "amllOrigFontsAtom",
    "",
)

export const amllSpaceWidthAtom = atomWithStorage(
    "amllSpaceWidthAtom",
    "",
)

export const amllAnyLangAtom = atomWithStorage(
    "amllAnyLangAtom",
    false,
)

export const amllTsFontsAtom = atomWithStorage(
    "amllTsFontsAtom",
    "",
)

export const amllTsSizeAtom = atomWithStorage(
    "amllTsSizeAtom",
    "",
)

export const amllRomaFontsAtom = atomWithStorage(
    "amllRomaFontsAtom",
    "",
)

export const amllRomaSizeAtom = atomWithStorage(
    "amllRomaSizeAtom",
    "",
)

export const enableLyricSwapTransRomanLineAtom = atomWithStorage(
    "amll-react-full.enableLyricSwapTransRomanLineAtom",
    false,
);
