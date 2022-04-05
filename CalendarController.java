package calendar.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import calendar.dto.Schedule;
import calendar.service.face.CalendarService;

@CrossOrigin(origins="*", allowedHeaders = "*")
@Controller
public class CalendarController {

	@Autowired CalendarService calendarService;
	
	@RequestMapping(value="/main", method=RequestMethod.GET)
	@ResponseBody
	public Object main(HttpServletRequest req) {
		
		List<Schedule> schdlueList = calendarService.getCalendar(req);
		
		System.out.println("»Æ¿Œ" + schdlueList);
		
		return schdlueList;
	}
	
	@RequestMapping(value="/update", method=RequestMethod.POST)
	@ResponseBody
	public String update(@RequestBody List<Schedule> list) {	
		
		calendarService.schdlueListAdd(list);
		
		return "OK";
	}
	
	@RequestMapping(value="/delete", method=RequestMethod.POST)
	@ResponseBody
	public void delete(@RequestBody List<String> list) {
		
		calendarService.schdlueDelete(list);
		
	}
	
	@RequestMapping(value="/list", method=RequestMethod.GET)
	@ResponseBody
	public List<Schedule> list(Model model, HttpServletRequest req) {
				
		List<Schedule> selectSchdlue = calendarService.dayCalendar(req);
		
		model.addAttribute("selectSchdlue", selectSchdlue);
		
		return selectSchdlue;
	}
	
	
	
}
