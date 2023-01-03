import { update } from '../api';
import { getUserInfo, setUserInfo } from '../localStorage';
import { showLoading, hideLoading, showMessage, redirectUser } from '../utils';

const ProfileScreen = {
    after_render: () => {
        document
            .getElementById('profile-form')
            .addEventListener('submit', async (e) => {
                e.preventDefault();
                showLoading();
                const data = await update({
                    name: document.getElementById('name').value,
                    email: document.getElementById('email').value,
                });
                hideLoading();
                if (data.error) {
                    showMessage(data.error);
                } else {
                    setUserInfo(data);
                    redirectUser();
                }
            });
    },
    render: () => {
        const {name, email} = getUserInfo();
        if (!name) {
            document.location.hash = '/';
        }
        return `
        <div class="form-container">
            <form id="profile-form">
                <ul class="form-items">
                    <li>
                        <h1>User Profile<h1>
                    </li>
                    <li>
                        <label for="name">Name</label>
                        <input type="name" name="name" id="name" value="${name}"/>
                    </li>
                    <li>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" value="${email}"/>
                    </li>
                    <li>
                        <button type="submit" class="primary">Update</button>
                    </li>
                    
                </ul>
            </form>
        </div>
        `;
    },
};

export default ProfileScreen;