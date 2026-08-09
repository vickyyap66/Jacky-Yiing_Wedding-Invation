# Jacky & Yiing Wedding Invitation

手机优先的电子结婚请柬网页。

## 文件
- `index.html` — 网页主体
- `style.css` — 视觉设计与动画
- `script.js` — 倒数计时、地图、Waze、RSVP
- `wedding-photo.png` — 你上传的婚纱照

## 使用方式
直接把整个文件夹上传到 GitHub Pages、Netlify、Vercel 等静态网站服务即可。

## RSVP
打开 `script.js`，找到：

`const WHATSAPP_NUMBER = "";`

填入新人的 WhatsApp 号码，例如：

`const WHATSAPP_NUMBER = "60123456789";`

然后 RSVP 按钮就会自动打开 WhatsApp，并带上宾客姓名、人数和出席状态。

## 背景音乐
如需音乐：
1. 准备一首你有权使用的 MP3。
2. 命名为 `music.mp3`。
3. 放在与 `index.html` 同一个文件夹。
4. 点击右上角音乐按钮播放/暂停。

## 地址
目前使用：
14/15 Jalan Jambu Melaka 2, Jinjang Selatan, Kuala Lumpur

如需修改，请在 `script.js` 的 `VENUE` 中修改。

## 日期
目前设置为：
25 October 2026, 10:00 AM (Malaysia time, UTC+8)

## 建议
正式发给亲朋好友前，请在手机上测试：
- Google Maps
- Waze
- RSVP
- 页面滚动
- 音乐
- 不同尺寸的手机
