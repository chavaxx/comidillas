import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, redirectUser, showLoading, showMessage, generateRandomPassword} from "../utils";

const RegisterScreen = {
    after_render: () =>{
        document.getElementById("register-form").addEventListener("submit", async(e)=>{
            e.preventDefault();
            showLoading();
            const data = await register({
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: generateRandomPassword(),
            });
            hideLoading();
            if(data.error){
                showMessage(data.error);
            }
            else{
                setUserInfo(data);
                showMessage("We have sent to you an email with a temporal password");
                document.location.hash='/signin';
            }
        });

    },
    render: () =>{
        
        return `
        <div class="form-container">
            <form id="register-form">
                <ul class="form-items">
                    <li>
                        <h1>Create account</h1>
                    </li>
                    <li>
                        <label for="name">Name</label>
                        <input type="name" name="name" id="name"/>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email"/>
                    </li>
                    <li>
                        <button type="submit" class="primary">Register</button>
                    </li>
                    <li>
                        <div>
                            Already have an account?
                            <a href="/#/signin">Signin</a>
                        </div>
                    </li>
                </ul>
            </form>
        </div>
        `;
    }
};

export default RegisterScreen;