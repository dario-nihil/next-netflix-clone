import { verifyToken } from "../../lib/utils";
import { removeTokenCookie } from "../../lib/cookies";
import { magicAdmin } from "../../lib/magic";

const logout = async (req, res) => {
  try {
    if (!req.cookies.token) {
      return res.status(401).json({ msg: "User is not logged in" });
    }

    const { token } = req.cookies;
    const userId = await verifyToken(token);
    removeTokenCookie(res);

    try {
      await magicAdmin.users.logoutByIssuer(userId);
    } catch (error) {
      console.log("User's session with Magic already expired");
      console.log("Error occurred while logging out magic user", error);
    }
    // redirects user to login page
    res.writeHead(302, { location: "/login" });
    res.end();
  } catch (error) {
    console.log({ error });
    res.status(401).json({ msg: "User is not loggedin" });
  }
};

export default logout;
