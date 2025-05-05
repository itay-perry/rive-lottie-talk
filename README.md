# rive-lottie-talk 🎃

How to use?

Start `Cursor` or `VSCode`

Install the extension Live Server and just click **Go Live** in your editor (bottom command bar)

---------------------------------------

Why is this extension needed? 

🌼 Modern browsers restrict `file://` protocol from loading local resources for security reasons..
The Lottie animation tries to fetch the JSON file using XMLHttpRequest/Fetch, which is blocked under `file://` :) 🌼
