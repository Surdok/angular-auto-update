import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { first } from 'rxjs/operators';
import swal from 'sweetalert2';
@Injectable()
export class VersionCheckService {
  // this will be replaced by actual hash post-build.js
  private currentHash = '{{POST_BUILD_ENTERS_HASH_HERE}}';
  private currentVersion = '{{POST_BUILD_VERSION_HERE}}';

  constructor(private http: HttpClient) { }

  /**
   * Checks in every set frequency the version of frontend application
   * @param url
   * @param {number} frequency - in milliseconds, defaults to 1 minutes
   */
  public initVersionCheck(url, frequency = 1000 * 5) {
    setInterval(() => {
      this.checkVersion(url);
    }, frequency);
  }

  /**
   * Will do the call and check if the hash has changed or not
   * @param url
   */
  private checkVersion(url) {
    // timestamp these requests to invalidate caches

    this.http.get('/version.json?t=' + new Date().getTime()).pipe(first())
      .subscribe(

        (response: { version: string; hash: string; }) => {

          console.log('Response : ', response);
          const hash = response.hash;
          const hashChanged = this.hasHashChanged(this.currentHash, hash);

          // If new version, do something
          if (hashChanged) {
            // ENTER YOUR CODE TO DO SOMETHING UPON VERSION CHANGE
            // for an example: location.reload();
            console.log('Hash changed.');

            swal.fire({
              title: 'Website Updated!',
              text: 'The application has been updated! Are you sure you want to refresh the page?',
              icon: 'question'
            }).then(r => {
              if (r.value) {
                window.location.reload(true);
              }
            })
          } else {
            // Hash coudln't be found!!
            // Hash coudln't be found!!
            // Hash coudln't be found!!
            console.log('Hash didn\'t change.');

          }
          // store the new hash so we wouldn't trigger versionChange again
          // only necessary in case you did not force refresh
          this.currentHash = hash;
        },
        (err) => {
          console.error(err, 'Could not get version!');
        }
      );
  }

  /**
   * Checks if hash has changed.
   * This file has the JS hash, if it is a different one than in the version.json
   * we are dealing with version change
   * @param currentHash
   * @param newHash
   * @returns {boolean}
   */
  private hasHashChanged(currentHash, newHash) {
    if (!currentHash || currentHash === '{{POST_BUILD_ENTERS_HASH_HERE}}') {
      return false;
    }
    console.log(currentHash, newHash);

    return currentHash !== newHash;
  }
}