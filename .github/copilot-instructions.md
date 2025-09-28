# ioBroker Adapter Development with GitHub Copilot

**Version:** 0.4.0
**Template Source:** https://github.com/DrozmotiX/ioBroker-Copilot-Instructions

This file contains instructions and best practices for GitHub Copilot when working on ioBroker adapter development.

## Project Context

You are working on an ioBroker adapter. ioBroker is an integration platform for the Internet of Things, focused on building smart home and industrial IoT solutions. Adapters are plugins that connect ioBroker to external systems, devices, or services.

**Adapter-Specific Context:**
This is the `vis-material-advanced` adapter, which provides Material Design widgets for the ioBroker visualization system (vis). Unlike typical adapters that connect to external systems, this is a widget collection adapter that:

- **Primary Purpose**: Provides pre-designed Material Design widgets for ioBroker's vis interface
- **Widget Types**: Door, Window, Temperature, Humidity, Pressure, Light, Dimmer, Shutter, Volume, Thermostat, Boolean, Number, Text, Valve widgets
- **Architecture**: Frontend-only adapter (onlyWWW: true) with no backend processes
- **Main Components**: 
  - Widget definitions in `widgets/vis-material-advanced.html`
  - Widget styling and behavior in JavaScript/CSS files
  - Configuration through vis interface
- **Dependencies**: Requires `vis` adapter and `icons-mfd-svg` for proper functionality
- **Target Users**: Smart home enthusiasts who want professional Material Design interfaces

## Testing

### Unit Testing
- Use Jest as the primary testing framework for ioBroker adapters
- Create tests for all adapter main functions and helper methods
- Test error handling scenarios and edge cases
- Mock external API calls and hardware dependencies
- For adapters connecting to APIs/devices not reachable by internet, provide example data files to allow testing of functionality without live connections
- Example test structure:
  ```javascript
  describe('AdapterName', () => {
    let adapter;
    
    beforeEach(() => {
      // Setup test adapter instance
    });
    
    test('should initialize correctly', () => {
      // Test adapter initialization
    });
  });
  ```

### Integration Testing

**IMPORTANT**: Use the official `@iobroker/testing` framework for all integration tests. This is the ONLY correct way to test ioBroker adapters.

**Official Documentation**: https://github.com/ioBroker/testing

#### Framework Structure
Integration tests MUST follow this exact pattern:

```javascript
const path = require('path');
const { tests } = require('@iobroker/testing');

// Define test coordinates or configuration
const TEST_COORDINATES = '52.520008,13.404954'; // Berlin
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

// Use tests.integration() with defineAdditionalTests
tests.integration(path.join(__dirname, '..'), {
    defineAdditionalTests({ suite }) {
        suite('Test adapter with specific configuration', (getHarness) => {
            let harness;

            before(() => {
                harness = getHarness();
            });

            it('should configure and start adapter', function () {
                return new Promise(async (resolve, reject) => {
                    try {
                        harness = getHarness();
                        
                        // Get adapter object using promisified pattern
                        const obj = await new Promise((res, rej) => {
                            harness.objects.getObject('system.adapter.your-adapter.0', (err, o) => {
                                if (err) return rej(err);
                                res(o);
                            });
                        });
                        
                        if (!obj) {
                            return reject(new Error('Adapter object not found'));
                        }

                        // Configure adapter properties
                        Object.assign(obj.native, {
                            position: TEST_COORDINATES,
                            createCurrently: true,
                            createHourly: true,
                            createDaily: true,
                            // Add other configuration as needed
                        });

                        // Set the updated configuration
                        harness.objects.setObject(obj._id, obj);

                        console.log('✅ Step 1: Configuration written, starting adapter...');
                        
                        // Start adapter and wait
                        await harness.startAdapterAndWait();
                        
                        console.log('✅ Step 2: Adapter started');

                        // Wait for adapter to process data
                        const waitMs = 15000;
                        await wait(waitMs);

                        console.log('🔍 Step 3: Checking states after adapter run...');
                        
                        // Check that adapter created expected states
                        const allStates = await harness.states.getKeysAsync('your-adapter.0.*');
                        
                        if (allStates.length === 0) {
                            return reject(new Error('No states created by adapter'));
                        }

                        console.log(`✅ SUCCESS: Found ${allStates.length} states created by adapter`);
                        resolve(true);
                    } catch (error) {
                        console.error('❌ FAILURE:', error.message);
                        reject(error);
                    }
                });
            });
        });
    }
});
```

#### Testing Best Practices

**Key Requirements:**
- Always use the official `@iobroker/testing` framework
- Use `tests.integration()` for comprehensive testing
- Include proper error handling and timeouts
- Test configuration changes and state creation
- Validate adapter lifecycle (start, run, stop)

**Common Patterns:**
```javascript
// Check adapter is running
const isRunning = harness.isAdapterRunning();

// Wait for specific states to be created
const checkState = async (stateId) => {
    const state = await harness.states.getStateAsync(stateId);
    return state !== null && state !== undefined;
};

// Verify configuration applied correctly
const config = await harness.objects.getObjectAsync('system.adapter.your-adapter.0');
expect(config.native).to.deep.include(expectedConfig);
```

## Development Environment and Dependencies

### Required Dependencies
- Node.js 16+ (as specified in package.json engines)
- npm for package management
- ioBroker installation for testing

### Development Dependencies
Key development tools already configured:
- `@iobroker/testing` - Official testing framework
- `mocha` - Test runner
- `chai` - Assertion library  
- `@alcalzone/release-script` - Automated releases
- `gulp` - Build tooling

### Development Setup
```bash
npm install          # Install dependencies
npm test            # Run package validation tests
npm run release     # Create automated release
```

## Configuration and State Management

### Adapter Configuration
- Configuration stored in `io-package.json` under `native` property
- Use `adminUI.config: "none"` for adapters without admin interface
- Set `noConfig: true` for adapters that don't require user configuration

### State Structure
Follow ioBroker state naming conventions:
```javascript
// Standard state structure
adapter.0.info.connection       // Connection status
adapter.0.device.property       // Device-specific properties
adapter.0.channel.state         // Grouped states in channels
```

### Object Definitions
Define objects before creating states:
```javascript
await this.setObjectNotExistsAsync('info.connection', {
    type: 'state',
    common: {
        name: 'Connected to device',
        type: 'boolean',
        role: 'indicator.connected',
        read: true,
        write: false,
    },
    native: {},
});
```

## Error Handling and Logging

### Logging Levels
Use appropriate logging levels:
- `this.log.error()` - Critical errors that prevent functionality
- `this.log.warn()` - Warnings about non-critical issues
- `this.log.info()` - General information about adapter operation
- `this.log.debug()` - Detailed debugging information
- `this.log.silly()` - Very verbose debugging output

### Error Handling Pattern
```javascript
try {
    // Adapter operation
    await this.someAsyncOperation();
} catch (error) {
    this.log.error(`Operation failed: ${error.message}`);
    // Don't throw unless critical - log and continue
}
```

### Connection Management
For adapters with external connections:
```javascript
async onReady() {
    try {
        await this.connectToDevice();
        await this.setState('info.connection', true, true);
    } catch (error) {
        this.log.error(`Connection failed: ${error.message}`);
        await this.setState('info.connection', false, true);
    }
}

async onUnload(callback) {
    try {
        await this.disconnectFromDevice();
        await this.setState('info.connection', false, true);
        callback();
    } catch (error) {
        callback();
    }
}
```

## Lifecycle Management

### Startup Sequence
```javascript
async onReady() {
    // 1. Initialize adapter settings
    this.config = this.config || {};
    
    // 2. Create necessary objects
    await this.createObjects();
    
    // 3. Start main adapter logic
    await this.startAdapter();
    
    // 4. Set connection state
    await this.setState('info.connection', true, true);
}
```

### Shutdown Sequence
```javascript
async onUnload(callback) {
  try {
    // 1. Stop timers and intervals
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = undefined;
    }
    
    // 2. Close connections
    if (this.connection) {
      await this.connection.close();
      this.connection = undefined;
    }
    
    // 3. Update connection state
    await this.setState('info.connection', false, true);
    
    // 4. Clean up resources
    // Close connections, clean up resources
    callback();
  } catch (e) {
    callback();
  }
}
```

## Code Style and Standards

- Follow JavaScript/TypeScript best practices
- Use async/await for asynchronous operations
- Implement proper resource cleanup in `unload()` method
- Use semantic versioning for adapter releases
- Include proper JSDoc comments for public methods

## Widget Development Specific Guidelines

**For vis-material-advanced adapter specifically:**

### Widget Structure
- Main widget file: `widgets/vis-material-advanced.html`
- Widget definitions use vis widget format with HTML, CSS, and JavaScript
- Follow Material Design principles for consistent theming

### Widget Development Patterns
```javascript
// Widget initialization
vis.binds.vis-material-advanced = {
    version: "1.7.4",
    showVersion: function () {
        if (vis.binds.vis-material-advanced.version) {
            console.log('Version vis-material-advanced: ' + vis.binds.vis-material-advanced.version);
            vis.binds.vis-material-advanced.version = null;
        }
    },
    
    // Widget type definition
    widgetTypeName: function (el, data) {
        // Widget implementation
    }
};
```

### Widget Configuration
- Use vis widget configuration system for user-configurable parameters
- Implement proper data binding for ioBroker states
- Handle state updates and user interactions appropriately

### Material Design Compliance
- Use consistent color schemes and typography
- Implement proper elevation and shadows
- Follow Material Design interaction patterns
- Ensure accessibility compliance

## CI/CD and Testing Integration

### GitHub Actions for API Testing
For adapters with external API dependencies, implement separate CI/CD jobs:

```yaml
# Tests API connectivity with demo credentials (runs separately)
demo-api-tests:
  if: contains(github.event.head_commit.message, '[skip ci]') == false
  
  runs-on: ubuntu-22.04
  
  steps:
    - name: Checkout code
      uses: actions/checkout@v4
      
    - name: Use Node.js 20.x
      uses: actions/setup-node@v4
      with:
        node-version: 20.x
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run demo API tests
      run: npm run test:integration-demo
```

### CI/CD Best Practices
- Run credential tests separately from main test suite
- Use ubuntu-22.04 for consistency
- Don't make credential tests required for deployment
- Provide clear failure messages for API connectivity issues
- Use appropriate timeouts for external API calls (120+ seconds)

### Package.json Script Integration
Add dedicated script for credential testing:
```json
{
  "scripts": {
    "test:integration-demo": "mocha test/integration-demo --exit"
  }
}
```

### Practical Example: Complete API Testing Implementation
Here's a complete example based on lessons learned from the Discovergy adapter:

#### test/integration-demo.js
```javascript
const path = require("path");
const { tests } = require("@iobroker/testing");

// Helper function to encrypt password using ioBroker's encryption method
async function encryptPassword(harness, password) {
    const systemConfig = await harness.objects.getObjectAsync("system.config");
    
    if (!systemConfig || !systemConfig.native || !systemConfig.native.secret) {
        throw new Error("Could not retrieve system secret for password encryption");
    }
    
    const secret = systemConfig.native.secret;
    let result = '';
    for (let i = 0; i < password.length; ++i) {
        result += String.fromCharCode(secret[i % secret.length].charCodeAt(0) ^ password.charCodeAt(i));
    }
    
    return result;
}

// Run integration tests with demo credentials
tests.integration(path.join(__dirname, ".."), {
    defineAdditionalTests({ suite }) {
        suite("API Testing with Demo Credentials", (getHarness) => {
            let harness;
            
            before(() => {
                harness = getHarness();
            });

            it("Should connect to API and initialize with demo credentials", async () => {
                console.log("Setting up demo credentials...");
                
                if (harness.isAdapterRunning()) {
                    await harness.stopAdapter();
                }
                
                const encryptedPassword = await encryptPassword(harness, "demo_password");
                
                await harness.changeAdapterConfig("your-adapter", {
                    native: {
                        username: "demo@provider.com",
                        password: encryptedPassword,
                        // other config options
                    }
                });

                console.log("Starting adapter with demo credentials...");
                await harness.startAdapter();
                
                // Wait for API calls and initialization
                await new Promise(resolve => setTimeout(resolve, 60000));
                
                const connectionState = await harness.states.getStateAsync("your-adapter.0.info.connection");
                
                if (connectionState && connectionState.val === true) {
                    console.log("✅ SUCCESS: API connection established");
                    return true;
                } else {
                    throw new Error("API Test Failed: Expected API connection to be established with demo credentials. " +
                        "Check logs above for specific API errors (DNS resolution, 401 Unauthorized, network issues, etc.)");
                }
            }).timeout(120000);
        });
    }
});
```

## Widget-Specific Development Notes

Since this is a visualization widgets adapter, additional considerations:

### Widget File Structure
- Widget definitions in `widgets/vis-material-advanced.html`
- Supporting images and assets in `widgets/` subdirectories
- Example configurations in `example.json` and `example2.json`

### Widget Testing Approach
- Test widget rendering and functionality in vis environment
- Validate Material Design theming consistency
- Ensure responsive design across different screen sizes
- Test data binding and state updates

### Widget Deployment
- No backend process required (onlyWWW: true)
- Widget files served directly by vis adapter
- Updates require vis adapter restart for widget reload