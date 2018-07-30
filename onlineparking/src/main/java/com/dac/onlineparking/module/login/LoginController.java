package com.dac.onlineparking.module.login;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.dac.onlineparking.module.exception.OnlineParkingGlobalException;

@RestController
public class LoginController {

	@Autowired
	private LoginService loginService;

	@RequestMapping(path = "mvc/login", method = RequestMethod.GET)
	public @ResponseBody LoginVO login(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String userName = request.getParameter("un");
		String password = request.getParameter("password");
		HttpSession sess = request.getSession(true);
		LoginStatusVO user = loginService.login(userName, password);
		try {

			if (user.isStatus()) {
				sess.setAttribute("user", user.getLoginVO());
				return user.getLoginVO();
			} else {
				sess.invalidate();
				
				throw new OnlineParkingGlobalException(user.getMessage());
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw new OnlineParkingGlobalException(user.getMessage());
		}
	}

	@RequestMapping(value = "mvc/logout", method = RequestMethod.GET)
	public @ResponseBody boolean logout(HttpServletRequest request, HttpServletResponse response) {
		HttpSession sess = request.getSession(false);
		if (sess != null) {
			sess.invalidate();
		}
		return true;
	}
}