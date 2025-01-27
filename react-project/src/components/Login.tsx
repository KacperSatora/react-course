import { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import PasswordIcon from "@mui/icons-material/Password";
import styles from "./Login.module.scss";

interface FormData {
    name: string;
    email: string;
    password: string;
}

export default function Login() {
    const [action, setAction] = useState<"Zaloguj się" | "Zarejestruj się">("Zarejestruj się");
    // const [clickCount, setClickCount] = useState<number>(0);
    const [formData, setFormData] = useState<FormData>({
        name: "",
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleClick = () => {
        const { name, email, password } = formData;

        if (!name || !email || !password) {
            alert("Wypełnij wszystkie pola");
            return;
        }

        navigate("/todo-list", { state: { userName: name } });

        // setClickCount((prev) => prev + 1);

        // if (clickCount === 1) {
        //     navigate("/todo-list", { state: { userName: name } });
        // }
    };

    return (
        <div className="flex flex-col m-auto mt-[200px] w-[600px] bg-slate-500 pb-[30px] rounded-md">
            <div className="flex flex-col items-center gap-[9px] w-full mt-[30px]">
                <div className="font-[700] text-[48px]">{action}</div>
                <div className={styles.underline}></div>
            </div>
            <div className="mt-[55px] flex flex-col gap-[25px]">
                <div className={styles.input}>
                    <PersonIcon style={{ color: "black", margin: "0px 30px" }} />
                    <input
                        type="text"
                        name="name"
                        placeholder="Imię"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.input}>
                    <EmailIcon style={{ color: "black", margin: "0px 30px" }} />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className={styles.input}>
                    <PasswordIcon style={{ color: "black", margin: "0px 30px" }} />
                    <input
                        type="password"
                        name="password"
                        placeholder="Hasło"
                        value={formData.password}
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="pl-[62px] mt-[27px] text-white text-[18px]">
                Zapomniano hasła?{" "}
                <span className="text-theme-fuchsia cursor-pointer">Kliknij tutaj</span>
            </div>
            <div className="pl-[62px] mt-[10px] text-white text-[18px]">Istotne jest tylko imie, hasło i email są tylko dla wyglądu</div>
            <div className="flex gap-[30px] my-[60px] mx-auto">
                <div
                    className={
                        action === "Zaloguj się"
                            ? "flex justify-center items-center w-[220px] h-[60px] text-white bg-theme-gray rounded-md text-[19px] font-[700] cursor-pointer"
                            : "flex justify-center items-center w-[220px] h-[60px] text-white bg-theme-fuchsia rounded-md text-[19px] font-[700] cursor-pointer"
                    }
                    onClick={() => {
                        if (action != "Zarejestruj się") {
                            setAction("Zarejestruj się");
                        } else {
                            handleClick();
                        }
                    }}
                >
                    Zarejestruj się
                </div>
                <div
                    className={
                        action === "Zarejestruj się"
                            ? "flex justify-center items-center w-[220px] h-[60px] text-white bg-theme-gray rounded-md text-[19px] font-[700] cursor-pointer"
                            : "flex justify-center items-center w-[220px] h-[60px] text-white bg-theme-fuchsia rounded-md text-[19px] font-[700] cursor-pointer"
                    }
                    onClick={() => {
                        if (action != "Zaloguj się") {
                            setAction("Zaloguj się");
                        } else {
                            handleClick();
                        }
                    }}
                >
                    Zaloguj się
                </div>
            </div>
        </div>
    );
};