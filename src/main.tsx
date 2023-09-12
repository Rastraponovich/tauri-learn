import { createRoot } from "react-dom/client"
import { Application } from "./app/app"
import "./app/index.css"
import { allSettled, fork } from "effector"
import { postsGet } from "./entities/posts"
import { Provider } from "effector-react"

const root = document.getElementById("root") as HTMLElement

const scope = fork()
await allSettled(postsGet, { scope })

createRoot(root).render(
    <Provider value={scope}>
        <Application />
    </Provider>
)
