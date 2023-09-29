const fs = require('fs');
const path = require('path');
const semver = require('semver');

// Paths to the package.json files
const backendPackagePath = path.join(__dirname, './backend/package.json');
const frontendPackagePath = path.join(__dirname, './frontend/package.json');
const sharedPackagePath = path.join(__dirname, './shared/package.json');

// Load the package.json files
const backendPackage = JSON.parse(fs.readFileSync(backendPackagePath, 'utf8'));
const frontendPackage = JSON.parse(fs.readFileSync(frontendPackagePath, 'utf8'));
const sharedPackage = JSON.parse(fs.readFileSync(sharedPackagePath, 'utf8'));

// Function to combine and sync versions between packages
function combineAndSyncVersions(source1, source2, target, type, targetType = type) {
    let updated = false;
    let conflicts = [];

    // Ensure that the target has this type of dependencies object
    if (!target[targetType]) {
        target[targetType] = {};
    }

    [source1, source2].forEach(source => {
        if (source && source[type]) {
            for (let pkg in source[type]) {
                if (!target[targetType][pkg] || target[targetType][pkg] !== source[type][pkg]) {
                    target[targetType][pkg] = source[type][pkg];
                    updated = true;

                    // Check for version conflicts
                    if (source1[type][pkg] && source2[type][pkg] && source1[type][pkg] !== source2[type][pkg]) {
                        conflicts.push({
                            pkg: pkg,
                            versions: [source1[type][pkg], source2[type][pkg]]
                        });
                    }
                }
            }
        }
    });

    // Resolve conflicts by choosing the latest version
    conflicts.forEach(conflict => {
        let cleanedVersion1 = semver.clean(conflict.versions[0].replace('^', ''));
        let cleanedVersion2 = semver.clean(conflict.versions[1].replace('^', ''));

        if (!cleanedVersion1 || !cleanedVersion2) {
            console.log(`Error cleaning versions for ${conflict.pkg}. Backend version: ${conflict.versions[0]}, Frontend version: ${conflict.versions[1]}.`);
            return; // Skip this conflict resolution
        }

        let latestVersion = semver.gt(cleanedVersion1, cleanedVersion2) ? conflict.versions[0] : conflict.versions[1];

        console.log(`Conflict in ${conflict.pkg}: backend has ${conflict.versions[0]} and frontend has ${conflict.versions[1]}. Resolving to ${latestVersion}.`);

        source1[type][conflict.pkg] = latestVersion;
        source2[type][conflict.pkg] = latestVersion;
        target[targetType][conflict.pkg] = latestVersion;
    });

    return updated || conflicts.length > 0;
}

let updatedDependencies = combineAndSyncVersions(backendPackage, frontendPackage, sharedPackage, "dependencies", "peerDependencies");
let updatedDevDependencies = combineAndSyncVersions(backendPackage, frontendPackage, sharedPackage, "devDependencies");

if (updatedDependencies || updatedDevDependencies) {
    fs.writeFileSync(sharedPackagePath, JSON.stringify(sharedPackage, null, 2));
    fs.writeFileSync(backendPackagePath, JSON.stringify(backendPackage, null, 2));
    fs.writeFileSync(frontendPackagePath, JSON.stringify(frontendPackage, null, 2));
    console.log('package.json files updated to resolve conflicts and match both frontend and backend.');
} else {
    console.log('All versions are already in sync.');
}
