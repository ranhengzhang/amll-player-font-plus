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
    const [amllInfoSize, setAmllInfoSize] = useAtom(amllInfoSizeAtom);
    const [amllMetaMod, setAmllMetaMod] = useAtom(amllMetaModAtom);
    const [amllOrigHeight, setAmllOrigHeight] = useAtom(amllOrigHeightAtom);
    const [amllOrigFonts, setAmllOrigFonts] = useAtom(amllOrigFontsAtom);
    const [amllTsFonts, setAmllTsFonts] = useAtom(amllTsFontsAtom);
    const [amllTsSize, setAmllTsSize] = useAtom(amllTsSizeAtom);
    const [amllRomaFonts, setAmllRomaFonts] = useAtom(amllRomaFontsAtom);
    const [amllRomaSize, setAmllRomaSize] = useAtom(amllRomaSizeAtom);

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

    let setAmllInfoSizeFunc = (() => {
        let info_timeout = null;

        return (size: string) => {
            setAmllInfoSize(size);

            if (info_timeout) clearTimeout(info_timeout);
            info_timeout = setTimeout(() => {
                consoleLog("INFO", "context", "AmllInfoSizeAtom: " + size);
                if (size) {
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
    font-size: ${size} !important;
}
`;
                }
            }, 800);
        };
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

    let setAmllOrigFontsFunc = (() => {
        let orig_timeout = null;

        return (family: string) => {
            setAmllOrigFonts(family);

            if (orig_timeout) clearTimeout(orig_timeout);
            orig_timeout = setTimeout(() => {
                consoleLog("INFO", "context", "AmllOrigFontsAtom: " + family);
                if (family) {
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
    font-family: ${family}, sans-serif !important;
}
`;
                }
            }, 800);
        };
    })();

    let [setAmllTsFontsFunc, setAmllTsSizeFunc] = (() => {
        let ts_timeout = null;
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

    let [setAmllRomaFontsFunc, setAmllRomaSizeFunc] = (() => {
        let roma_timeout = null;
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

    return (<div>
        <SubTitle>歌曲信息部分设置</SubTitle>
        <Card mt="2">
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">字体大小</Text>
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
                    <Text as="div">特殊语言字体</Text>
                </Flex>
                <Flex direction="column"  width="60%">
                    <TextField.Root
                        value={amllOrigFonts}
                        onChange={(e) => setAmllOrigFontsFunc(e.currentTarget.value)}
                    />
                </Flex>
            </Flex>
            <Separator my="3" size="4" />
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">翻译行字体</Text>
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
                    <Text as="div">翻译行字号</Text>
                </Flex>
                <TextField.Root
                    value={amllTsSize}
                    onChange={(e) => setAmllTsSizeFunc(e.currentTarget.value)}
                />
            </Flex>
            <Separator my="3" size="4" />
            <Flex direction="row" align="center" gap="4" my="2">
                <Flex direction="column" flexGrow="1">
                    <Text as="div">音译行字体</Text>
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
                    <Text as="div">音译行字号</Text>
                </Flex>
                <TextField.Root
                    value={amllRomaSize}
                    onChange={(e) => setAmllTsSizeFunc(e.currentTarget.value)}
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

export const amllInfoSizeAtom = atomWithStorage(
    "amllInfoSizeAtom",
    "",
)

export const amllMetaModAtom = atomWithStorage(
    "amllMetaModAtom",
    false,
)

export const amllOrigHeightAtom = atomWithStorage(
    "amllOrigHeightAtom",
    false,
)

export const amllOrigFontsAtom = atomWithStorage(
    "amllOrigFontsAtom",
    "",
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