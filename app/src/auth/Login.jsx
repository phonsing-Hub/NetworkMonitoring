import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Checkbox,
  Divider,
  Button,
  Image,
  Input,
} from "@nextui-org/react";
import { LuFolderLock } from "react-icons/lu";
import { TbEyeSearch } from "react-icons/tb";
import { PiEyeSlashDuotone } from "react-icons/pi";

const IP = import.meta.env.VITE_DEFAULT_IP;

function Login({ setAuth }) {
  const [authid, setAuthid] = useState("");
  const [password, setPassword] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error1, setError1] = useState({
    error: false,
    mess: "",
  });
  const [error2, setError2] = useState({
    error: false,
    mess: "",
  });

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = async () => {
    try {
      setError1({
        error: false,
        mess: "",
      });
      setError2({
        error: false,
        mess: "",
      });
      setIsLoading(true);
      const res = await axios.post(
        `${IP}/api/auth`,
        {
          name_id: authid,
          password,
        },
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      setAuth("success");
    } catch (error) {
      setIsLoading(false);
      if (error.response.data.emp) {
        setError1({
          error: true,
          mess: error.response.data.emp,
        });
      }

      if (error.response.data.pwd) {
        setError2({
          error: true,
          mess: error.response.data.pwd,
        });
      }
    }
  };
  return (
    <main className="flex w-screen h-screen justify-center items-center fixed">
      <Card className="w-2/6 p-4">
        <CardHeader className="flex gap-3">
          <Image
            alt="apl logo"
            height={150}
            radius="sm"
            src="LogoL.png"
            width={150}
          />
          <div className="flex absolute right-10">
            <p className="text-md text-3xl font-bold">Login</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="flex flex-col gap-4">
            <Input
              endContent={
                <LuFolderLock className="text-3xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              label="ID Or Email"
              placeholder="Enter your email"
              variant="flat"
              color="primary"
              value={authid}
              onValueChange={setAuthid}
              isInvalid={error1.error}
              errorMessage={error1.mess}
            />
            <Input
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <PiEyeSlashDuotone className="text-3xl text-default-400 pointer-events-none" />
                  ) : (
                    <TbEyeSearch className="text-3xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              label="Password"
              placeholder="Enter your password"
              variant="flat"
              color="primary"
              value={password}
              onValueChange={setPassword}
              isInvalid={error2.error}
              errorMessage={error2.mess}
            />
            <Checkbox
              classNames={{
                label: "text-small",
              }}
            >
              Remember me
            </Checkbox>
          </div>
        </CardBody>
        <CardFooter className="flex justify-end">
          <Button
            color="primary"
            radius="sm"
            type="submit"
            onPress={handleLogin}
            isLoading={isLoading}
          >
            {isLoading ? "Login ..." : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}

export default Login;
