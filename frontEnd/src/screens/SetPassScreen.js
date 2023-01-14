import { updatePass } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage } from "../utils";

const SetPassScreen = {
    after_render: () =>{
        document.getElementById("password-form").addEventListener("submit", async(e)=>{
            e.preventDefault();
            showLoading();
            const data = await updatePass({
                password: document.getElementById('password').value,
                lastOnline: Date().toLocaleString(),
            });
            hideLoading();
            if(data.error) {
                showMessage(data.error);
            } else {
                setUserInfo(data);
                redirectUser();
            }
        });

    },
    render: () =>{
        return `
        <div class="form-container">
            <form id="password-form">
                <ul class="form-items">
                    <li>
                        <h1>Change your password</h1>
                    </li>
                    <li>
                        <label for="password">Password sent</label>
                        <input type="password" name="passwordsent" id="passwordsent"/>
                    </li>
                    <li>
                        <label for="password">Password</label>
                        <input type="password" name="password" id="password" pattern="^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*" />
                    </li>
                    <li>
                        <button type="submit" class="primary">Set password</button>
                    </li>
                </ul>
            </form>
        </div>
        `;
    }
};

export default SetPassScreen;