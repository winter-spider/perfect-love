package wedding.perfectlove23.app.invitation;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class InvitationService {
	@Autowired
	private InvitationRepository invitationRepository;

	public Invitation addInvitation(Invitation invitation) {
		return invitationRepository.save(invitation);
	}

        public List<Invitation> addInvitations(List<Invitation> invitations) {
		return (List<Invitation>) invitationRepository.saveAll(invitations);
	}

        public void addInvitationsSpecial(List<Invitation> invitations) {
                for(Invitation invitation : invitations) {
                    Optional<Invitation> invitation2 = invitationRepository.findByMobileNumber(invitation.mobileNumber);
                    if (!invitation2.isPresent()) {
                         invitationRepository.save(invitation);
                    }
                }
	}

        public void addInvitationsPhysical(List<Invitation> invitations) {
                for(Invitation invitation : invitations) {
                    invitation.setAppearance("Physical presence");
                    invitationRepository.save(invitation);
                }
	}
	
	public Optional<Invitation> getInvitation(int id) {
		return invitationRepository.findById(id);
	}
	
	public Optional<Invitation> getInvitationByMobileNumber(String mobileNumber) {
		return invitationRepository.findByMobileNumber(mobileNumber);
	}
	
	public List<Invitation> getInvitationGreatherThan(int id) {
		return invitationRepository.findFirst10ByIdGreaterThanEqual(id);
	}
	
	public List<Invitation> getAllInvitation() {
		return (List<Invitation>) invitationRepository.findAll();
	}
        
}
