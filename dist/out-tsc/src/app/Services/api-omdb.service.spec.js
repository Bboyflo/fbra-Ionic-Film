import { TestBed } from '@angular/core/testing';
import { ApiOMDbService } from './api-omdb.service';
describe('ApiOMDbService', function () {
    beforeEach(function () { return TestBed.configureTestingModule({}); });
    it('should be created', function () {
        var service = TestBed.get(ApiOMDbService);
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=api-omdb.service.spec.js.map