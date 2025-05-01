import { Button, Input } from "antd";
import styles from "./auth.module.scss";
import { useNavigate } from "react-router-dom";
import { useAccessStore } from "../../store/access";
import ChatGPTIcon from "../../icons/chatgpt.svg";
import React from "react";

export function Auth() {
    const navigate = useNavigate();
    const access = useAccessStore();

    return (
        <div className={styles["auth-page"]}>
            <div className={styles["auth-header"]}>
                <ChatGPTIcon className={styles["auth-logo"]} />
                <div className={styles["auth-title"]}>Griffith-AIhub</div>
                <div className={styles["auth-sub-title"]}>
                    专注AI前沿，开启智能新程
                </div>
            </div>
            <div className={styles["auth-content"]}>
                <img
                    src="/img/glfs.jpg"
                    style={{ width: 250 }}
                    className={styles["auth-image"]}
                />
                <div className={styles["auth-tips"]}>
                    扫码关注公众号【格里菲斯的Code与读书日常】，
                    <a
                        href="/img/glfs.jpg"
                        target="_blank"
                    >
                        回复【403】获取专属访问密钥
                    </a>
                </div>
                <Input
                    className={styles["auth-input"]}
                    type="password"
                    placeholder="请输入您的访问密钥"
                    value={access.accessCode}
                    onChange={(e) => {
                        access.updateCode(e.currentTarget.value);
                    }}
                    status={access.accessCodeErrorMsgs?'error': ''}
                />
                {access.accessCodeErrorMsgs? <span className={styles['auth-error']}>{access.accessCodeErrorMsgs}</span> : null}
                <div className={styles["auth-actions"]}>
                    <Button type="primary" onClick={() => access.login()}>
                        <i className="fa-solid fa-right-to-bracket"></i> 确认登录
                    </Button>
                </div>
            </div>

        </div>
    );
}