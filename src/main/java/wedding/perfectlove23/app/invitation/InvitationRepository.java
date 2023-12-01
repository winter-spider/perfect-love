package wedding.perfectlove23.app.invitation;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvitationRepository extends CrudRepository<Invitation, Integer> {
	public Optional<Invitation> findByMobileNumber(String mobileNumber);
	public List<Invitation> findFirst10ByIdGreaterThanEqual(int id);
}
