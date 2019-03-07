import { TestBed } from '@angular/core/testing';
import { DbFavorisService } from './db-favoris.service';
describe('DbFavorisService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(DbFavorisService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=db-favoris.service.spec.js.map