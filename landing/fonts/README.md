# Prefrontal Rounded

`prefrontal-rounded.woff2` 是资源圆体（Resource Han Rounded CN 1.910，可变字体）的子集，只含官网 `landing-v2.html` 里用圆体的那些字：大标题、格子数字、状态行、按钮。

- 授权：SIL Open Font License 1.1，<https://scripts.sil.org/OFL>。字体文件里的版权（nameID 0）和授权说明（nameID 13、14）原样保留。
- 版权：© 2018—2022 Cyano Hao；部分 © 2014-2021 Adobe，保留字体名 "Source"。
- OFL 规定修改版不能沿用保留字体名，所以这个子集改名为 "Prefrontal Rounded"。
- 来源：<https://github.com/CyanoHao/Resource-Han-Rounded/releases/tag/v1.910>，文件 `RHR-CFF2-CN-1.910.7z`。

要抽哪些字，脚本直接从页面里读：h1、h2、字标、底纹大字、游戏名那一行、按钮、下载卡上的平台名，以及它们在英文对照表里的英文。所以页面文案改了，重新跑一遍就行，不用手动列字。脚本是外层仓库的 `brand/subset-rounded.py`：

```bash
python3 -I brand/subset-rounded.py /path/to/ResourceHanRoundedCN-VF.otf WebSource/landing-v2.html WebSource/landing/fonts/prefrontal-rounded.woff2
```

需要 fontTools 和 brotli（`pip install fonttools brotli`）。如果给圆体加了新的 class，要同时加进脚本里的 `ROUND_CLASSES`。
