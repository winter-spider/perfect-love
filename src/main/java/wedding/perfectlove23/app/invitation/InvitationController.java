package wedding.perfectlove23.app.invitation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class InvitationController {
	@Autowired
	private InvitationService invitationService;

	@RequestMapping(method = RequestMethod.POST, value = "/invitation")
	public Invitation addInvitation(@RequestBody Invitation invitation) {
		return invitationService.addInvitation(invitation);
	}

        @RequestMapping(method = RequestMethod.POST, value = "/invitations")
	public List<Invitation> addInvitations(@RequestBody List<Invitation> invitations) {
		return invitationService.addInvitations(invitations);
	}

        @RequestMapping(method = RequestMethod.POST, value = "/special/invitations")
	public void addInvitationsSpecial(@RequestBody List<Invitation> invitations) {
		invitationService.addInvitationsSpecial(invitations);
	}


        @RequestMapping(method = RequestMethod.POST, value = "/physical/invitations")
	public void addInvitationsPhysical(@RequestBody List<Invitation> invitations) {
		invitationService.addInvitationsPhysical(invitations);
	}

	@RequestMapping(value = "/invitation/generate")
	public List<Invitation> generateInvitation() {
		for(int i = 0; i < 1000; i++) {
			Invitation invitation = new Invitation();
			invitation.setFirstName("Samuel");
			invitation.setLastName("Akor " + (i + 1));
			invitation.setAppearance("Physical presence");
			invitation.setArrivalDate("04/04/2023");
			invitation.setAssistance("No");
			invitation.setEmail("soft6dev@gmail.com " + (i + 1));
			invitation.setMemories("Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum porro consequuntur animi libero aperiam dolorem, qui praesentium deleniti natus beatae. Architecto explicabo necessitatibus voluptate, tenetur animi quam corporis recusandae esse");
			invitation.setMobileNumber("0915590001" + i);
			invitation.setState("Rivers State");
			invitation.setTitle("Bro");
			invitation.setPhoto("./images/2.jpg");
			
			invitationService.addInvitation(invitation);
		}
		return invitationService.getAllInvitation();
	}
	
	@RequestMapping("/invitation/{id}")
	public Optional<Invitation> getInvitation(@PathVariable int id) {
		return invitationService.getInvitation(id);
	}

	@RequestMapping("{mobileNumber}/invitation")
	public Optional<Invitation> getInvitationByMobileNumber(@PathVariable String mobileNumber) {
		return invitationService.getInvitationByMobileNumber(mobileNumber);
	}
	
	@RequestMapping("/invitations/{id}")
	public List<Invitation> getInvitationGreaterThan(@PathVariable int id) {
		return invitationService.getInvitationGreatherThan(id);
	}

	@RequestMapping("/invitations")
	public List<Invitation> getAllInvitation() {
		return invitationService.getAllInvitation();
	}
}
